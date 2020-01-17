import { OrderKind, ValueLedgerDeployOrder } from "@0xcert/ethereum-gateway";

import {
  buildGatewayConfig,
  NetworkKind
} from "@0xcert/ethereum-metamask-provider";

export const config = {
  providerConfig: {
    requiredConfirmations: 1,
    gatewayConfig: buildGatewayConfig(NetworkKind.ROPSTEN) // ropsten config
  },
  valueLedgerId: "", // Input you own value ledger id
  account1Id: "", // Input your primary metamask account Id.
  signature: ""
};

export const order = {
  kind: OrderKind.VALUE_LEDGER_DEPLOY_ORDER,
  makerId: config.account1Id,
  seed: Date.now(),
  expiration: Date.now() + 86400000,
  valueLedgerData: {
    name: "test",
    symbol: "TST",
    supply: "5000000000000000000000000",
    decimals: "18",
    ownerId: config.account1Id
  },
  tokenTransferData: {
    ledgerId: config.valueLedgerId,
    value: "100000000000000000000"
  }
} as ValueLedgerDeployOrder;
