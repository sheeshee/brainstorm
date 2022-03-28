% Brainstorm.js Processes

# Host / Guest / Server Sequence Diagram

See Figure \ref{fig:example}...

> Created with `pandoc -t latex -F mermaid-filter -o process.pdf processes.md`

~~~{.mermaid #fig:example format=svg caption="Communications in a Session. " }
sequenceDiagram
    participant H as Host
    participant P as Peer
    participant S as Server

    rect rgb(255, 234, 247)
    Note left of H: SETUP
    Note left of H: Host user clicks "New Session"
    H->>S:Requests Session Code
    S->>H: Returns Session Code
    H-->>P: Communicates Session Code outside of app
    Note left of P: Peer user enters Session Code and clicks "Join"
    P->>S: Sends Session Code
    S->>P: Returns Host Peer ID
    P->>H: Requests to join session
    Note left of H: Host user clicks "Start Session"
    end

    rect rgb(100, 234, 247)
    Note left of H: ACTIVE SESSION
    H->>P: Sends Prompt
    loop Until Host user clicks "Start Review"
        P->>H: Sends idea
        Note left of H: Displays idea
    end
    end

    rect rgb(255, 234, 247)
    Note left of H: REVIEW SESSION
    loop For every idea
        H->>P: Sends idea
        Note left of P: Peer user clicks rating
        P->>H: Sends rating
        Note left of H: Host clicks "Next"
    end
    end

    rect rgb(100, 234, 247)
    Note left of H: RESULTS
    H->>P: Sends results
    Note left of H: Displays final results
    Note left of P: Displays final results
    end
~~~

# React Router

Thew views in this app are
* Landing (`/`)
* Setup Guest (`/join`, optionally a query is provided `/join?join_code=<session-id>`)
* Setup Host (`/new`, then adds queries `/new?join_code=<session-id>` - if the join_code is defined when the user first loads the page then they are redirected to the `/join` view)
* Active Session (`session/<session-id>`)

#
