import { sdk } from "@farcaster/miniapp-sdk";
import { useEffect } from "react";
import { useAccount, useConnect, useSignMessage } from "wagmi";

function App() {
  useEffect(() => {
    // important, never remove this sdk init
    sdk.actions.ready();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
          textAlign: "center",
          margin: "0",
          fontWeight: "bold",
        }}
      >
        Vibes Engineering Template
      </h1>
      <p
        style={{
          fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)",
          textAlign: "center",
          margin: "0",
          opacity: 0.8,
        }}
      >
        Ready to launch 🚀
      </p>
      <ConnectMenu />
    </div>
  );
}

function ConnectMenu() {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();

  if (isConnected) {
    return (
      <>
        <div>Connected account:</div>
        <div>{address}</div>
        <SignButton />
      </>
    );
  }

  return (
    <button type="button" onClick={() => connect({ connector: connectors[0] })}>
      Connect
    </button>
  );
}

function SignButton() {
  const { signMessage, isPending, data, error } = useSignMessage();

  return (
    <>
      <button
        type="button"
        onClick={() => signMessage({ message: "hello world" })}
        disabled={isPending}
      >
        {isPending ? "Signing..." : "Sign message"}
      </button>
      {data && (
        <>
          <div>Signature</div>
          <div>{data}</div>
        </>
      )}
      {error && (
        <>
          <div>Error</div>
          <div>{error.message}</div>
        </>
      )}
    </>
  );
}

export default App;
