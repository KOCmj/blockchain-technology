document.addEventListener("DOMContentLoaded", () => {
  const connectBtn = document.getElementById("connectBtn");
  const walletModal = document.querySelector(".wallet-modal");
  const closeModalIcon = document.querySelector(".close-modal");
  const payWithCryptoBtns = document.querySelectorAll(".payWithCryptoBtn");


  connectBtn.addEventListener("click", () => {
    walletModal.classList.remove("hidden");
  });

  closeModalIcon.addEventListener("click", () => {
    walletModal.classList.add("hidden");
  });

  window.addEventListener("click", (event) => {
    if (event.target === walletModal) {
      walletModal.classList.add("hidden");
    }
  });

  payWithCryptoBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
            await connectToUniSat();
            console.log("Connected to UniSat wallet!");
      
            const paymentAmount = 0.00001; // Example amount for testnet BTC
            displayPaymentInstructions(paymentAmount);
      
            // Request the user to sign the transaction using UniSat wallet
            const transactionDetails = {
              to: "tb1ptpaxdwftcjjelnsjxnuw7dw9gqqkk9x39fj2pgwmw9rl2scwz4uqpfu284",
              value: paymentAmount,
            };
      
            const signedMessage = await window.unisat.signMessage(JSON.stringify(transactionDetails));
      

            const broadcastResponse = await broadcastTransaction(signedMessage);
      
            if (broadcastResponse.success) {
              updateUserAccount();
              displaySuccessMessage();
            } else {
              displayErrorMessage(broadcastResponse.error);
            }
      } catch (error) {
          console.error("Failed to connect to UniSat wallet or sign transaction:", error);
          displayErrorMessage(error.message);
      }    
    });
  });

  // Function to connect to UniSat wallet
  async function connectToUniSat() {
    try {
      const accounts = await window.unisat.requestAccounts();
      console.log("Connected to UniSat wallet!", accounts);
    } catch (error) {
      alert("Didn't connect to UniSat wallet, try again.");
      throw new Error(`Failed to connect to UniSat wallet: ${error.message}`);
    }
  }

  // Function to broadcast transaction/inscription
  async function broadcastTransaction(signedMessage) {
    try {
      const response = await fetch('/broadcast-transaction', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ signedMessage })
      });
  
      const data = await response.json();
  
      if (data.success) {
        return { success: true, data: data.data };
      } else {
        console.error("Broadcast error: ", data.error);
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error("Failed to broadcast transaction:", error);
      return { success: false, error: "Failed to broadcast transaction" };
    }
  }
  

  function displayPaymentInstructions(paymentAmount) {
    const paymentInstructions = `Please sign the transaction for ${paymentAmount} testnet BTC using your UniSat wallet.`;
    alert(paymentInstructions);
  }

  function updateUserAccount() {
    console.log("User account updated successfully.");
  }

  function displaySuccessMessage() {
    alert("Transaction completed successfully!");
  }

  function displayErrorMessage(errorMessage = "Transaction failed. Please try again.") {
    alert(errorMessage);
  }

  const connectWalletButtons = document.querySelectorAll(".connect-wallet");
  connectWalletButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const walletType = button.dataset.wallet;
      console.log(`Connecting to ${walletType} wallet...`);

      try {
        connectBtn.innerText = "CONNECTING...";
        if (walletType === "unisat") {
          await connectToUniSat();
        } else if (walletType === "xverse") {
          await connectToXverse();
        } else if (walletType === "leather") {
          await connectToLeather();
        }

        console.log(`Connected to ${walletType} wallet!`);
        walletModal.classList.add("hidden");
        connectBtn.innerText = "CONNECTED";
      } catch (error) {
        console.error(`Failed to connect to ${walletType} wallet:`, error);
        connectBtn.innerText = "CONNECT";
      }
    });
  });

  // Function to connect to Leather wallet
  async function connectToLeather() {
    try {
      const response = await window.LeatherProvider?.request("getAddresses");
      console.log('Connected to Leather wallet!');
      console.log("Addresses:", response.result.addresses);
    } catch (error) {
      throw new Error(`Failed to connect to Leather wallet: ${error.message}`);
    }
  }
});
