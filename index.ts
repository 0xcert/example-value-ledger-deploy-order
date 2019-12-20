import { config } from "./src/config";
import {
  checkApprovedValue,
  approveValue,
  signOrder,
  provider,
  performOrder
} from "./src/example";

const divConsole = document.getElementById("console");
const btnApproveTransfer = document.getElementById("btnApproveTransfer");
const btnSignOrder = document.getElementById("btnSignOrder");
const btnPerformOrder = document.getElementById("btnPerformOrder");

btnApproveTransfer.addEventListener("click", async () => {
  if (config.valueLedgerId === "") {
    printWarning(
      "No valueLedgerId defined. Set value ledger id in src/config.ts file."
    );
    return;
  }

  if (config.account1Id === "") {
    printWarning("No account1Id defined. Please set it in src/config.ts file.");
    return;
  }

  const isApproved = await checkApprovedValue().catch(e => {
    printError(e);
  });

  if (isApproved) {
    printMessage("Value already approved.");
  } else {
    const mutation = await approveValue().catch(e => {
      printError(e);
    });
    if (mutation) {
      printMessage("Value approval in progress: " + mutation.id);
      printMessage("This may take a while.");
      await mutation.complete();
      printMessage("Value approval completed.");
    }
  }
});

btnSignOrder.addEventListener("click", async () => {
  if (config.valueLedgerId === "") {
    printWarning(
      "No valueLedgerId defined. Set value ledger id in src/config.ts file."
    );
    return;
  }

  if (config.account1Id === "") {
    printWarning("No account1Id defined. Please set it in src/config.ts file.");
    return;
  }

  if (provider.accountId !== config.account1Id) {
    printWarning("Select account1 in metamask to sign this order.");
    return;
  }

  let error = null;
  await signOrder().catch(e => {
    error = e;
    printError(e);
  });

  if (!error) {
    printMessage("Order signing sucessfull: " + config.signature);
  }
});

btnPerformOrder.addEventListener("click", async () => {
  if (config.signature === "") {
    printWarning("No signature provided. Please sign the order first.");
    return;
  }

  const mutation = await performOrder().catch(e => {
    printError(e);
  });

  if (mutation) {
    printMessage("Atomic deployment in progress: " + mutation.id);
    printMessage("This may take a while.");
    await mutation.complete();
    printMessage("Atomic deployment completed");
    printMessage(
      "Created asset ledger address: " + mutation.logs[0].createdContract
    );
  }
});

function printError(message: any) {
  if (typeof message !== "string") {
    message = JSON.stringify(message, null, 2);
  }
  const div = document.createElement("div");
  div.innerText = "Error: " + message;
  div.className = "error";
  divConsole.prepend(div);
}

function printWarning(message: any) {
  if (typeof message !== "string") {
    message = JSON.stringify(message, null, 2);
  }
  const div = document.createElement("div");
  div.innerText = "Warning: " + message;
  div.className = "warning";
  divConsole.prepend(div);
}

function printMessage(message: any) {
  if (typeof message !== "string") {
    message = JSON.stringify(message, null, 2);
  }
  const div = document.createElement("div");
  div.innerText = message;
  divConsole.prepend(div);
}
