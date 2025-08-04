import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';

import TextAppMessageList from './TextAppMessageList';
import Constants from "../../constants/Constants";
import useStorage from './useStorage';



function TextApp(props) {

    // Set to true to block the user from sending another message
    const [isLoading, setIsLoading] = useState(false);

    const [messages, setMessages] = useStorage("chatMessages",[]);
    const inputRef = useRef();
    const [currentAssistantMessage, setCurrentAssistantMessage] = useState(null);

    /**
     * Called when the TextApp initially mounts.
     */
    async function handleWelcome() {
        if (!props.persona || !props.persona.name || !props.persona.prompt || !props.persona.initialMessage) return;
            setMessages([]);
            addMessage(Constants.Roles.Developer, props.persona.name + props.persona.prompt);
            addMessage(Constants.Roles.Assistant, props.persona.initialMessage);
    }

    /**
     * Called whenever the "Send" button is pressed.
     * @param {Event} e default form event; used to prevent from reloading the page.
     */
    async function handleSend(e) {
        e?.preventDefault();
        const input = inputRef.current.value?.trim();
        setIsLoading(true);
        if (input) {
            addMessage(Constants.Roles.User, input);
            inputRef.current.value = "";

            const resp = await fetch("https://cs571api.cs.wisc.edu/rest/su25/hw11/completions-stream", {
                method: "POST",
                headers: {
                    "X-CS571-ID": import.meta.env.VITE_CS571_ID,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([...messages, {
                    role: Constants.Roles.User,
                    content: input
                }])
            });

            const reader = resp.body.getReader();
            const decoder = new TextDecoder("utf-8");

            let unparsedLine = "";
            let constructedString = "";
            let done = false;

            setCurrentAssistantMessage(""); // Start showing live text

            while (!done) {
                const respObj = await reader.read();
                const value = respObj.value;
                done = respObj.done;
                if (value) {
                    const chunk = decoder.decode(value, { stream: true });
                    const lines = chunk.split("\n").filter(line => line.trim() !== "");
                    for (const line of lines) {
                        try {
                            let deltaObj = JSON.parse(unparsedLine + line);
                            unparsedLine = "";
                            constructedString += deltaObj.delta;

                            // Live update
                            setCurrentAssistantMessage(constructedString);
                            console.log(constructedString);
                        } catch (e) {
                            unparsedLine += line;
                        }
                    }
                }
            }

            // Finalize message
            setCurrentAssistantMessage(null);
            addMessage(Constants.Roles.Assistant, constructedString);
        }
        setIsLoading(false);
    }

    
    
    /**
     * Adds a message to the ongoing TextAppMessageList
     * 
     * @param {string} role The role of the message; either "user", "assistant", or "developer"
     * @param {*} content The content of the message
     */
    function addMessage(role, content) {
        setMessages(o => [...o, {
            role: role,
            content: content
        }]);
    }

    useEffect(() => {
        handleWelcome();
    }, [props.persona]);

    return (
        <div className="app">
            <TextAppMessageList messages={
                currentAssistantMessage?[...messages, {role: Constants.Roles.Assistant, content: currentAssistantMessage}] : messages
            }/>
            {isLoading ? <BeatLoader color="#36d7b7"/> : <></>}
            <div className="input-area">
                <Form className="inline-form" onSubmit={handleSend}>
                    <Form.Control
                        ref={inputRef}
                        style={{ marginRight: "0.5rem", display: "flex" }}
                        placeholder="Type a message..."
                        aria-label='Type and submit to send a message.'
                    />
                    <Button type='submit' disabled={isLoading}>Send</Button>
                </Form>
            </div>
        </div>
    );
}

export default TextApp;
