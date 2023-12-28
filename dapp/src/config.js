var txDefaultOrig =
{
  websites: {
    "wallet": "https://wallet.gnosis.pm",
    "gnosis": "https://gnosis.pm",
    "ethGasStation": ""
  },
  resources : {
    "termsOfUse": "",
    "privacyPolicy": "",
    "imprint": ""
  },
  gasLimit: 3141592,
  //gasPrice: 18000000000,
  ethereumNode: "https://dev-rpc.oortech.com",
  connectionChecker: {
    method : "OPTIONS",
    url : "https://www.google.com",
    checkInterval: 5000
  },
  accountsChecker: {
    checkInterval: 5000
  },
  transactionChecker: {
    checkInterval: 15000
  },
  wallet: "injected",
  defaultChainID: null,
  // Mainnet
  walletFactoryAddress: "0x4e15399b1f23239D306411129747749750F763fD", //Factory OORT
  tokens: [
    {
      'address': '0x6810e776880c02933d47db1b9fc05908e5386b96',
      'name': 'Gnosis',
      'symbol': 'GNO',
      'decimals': 18
    },
  ]
};

if (isElectron) {
  txDefaultOrig.wallet = "injected";
}

var txDefault = {
  ethereumNodes : [
    {
      url : "https://dev-rpc.oortech.com",
      name: "Oort(CCN)"
    },
    {
      url: "https://eth-sepolia.g.alchemy.com/v2/BM0-t-0ZSANZoT3riw1FZAMLfw_2M51B",
      name: "Sepolia Debug",
    }
  ],
  walletFactoryAddresses: {
    'mainnet': {
      name: 'Mainnet',
      address: txDefaultOrig.walletFactoryAddress
    },
    'ccnbeta': {
      name: 'ccnbeta',
      address: txDefaultOrig.walletFactoryAddress
    },
    'sepolia': {
      name: 'sepolia',
      address: '0xf65481565cae6f6e143964f6615cd042a0397447'
    },
  }
};

var oldWalletFactoryAddresses = [
  ("0x12ff9a987c648c5608b2c2a76f58de74a3bf1987").toLowerCase(),
  ("0xed5a90efa30637606ddaf4f4b3d42bb49d79bd4e").toLowerCase(),
  ("0xa0dbdadcbcc540be9bf4e9a812035eb1289dad73").toLowerCase()
];

/**
* Update the default wallet factory address in local storage
*/
function checkWalletFactoryAddress() {
  var userConfig = JSON.parse(localStorage.getItem("userConfig"));

  if (userConfig && oldWalletFactoryAddresses.indexOf(userConfig.walletFactoryAddress.toLowerCase()) >= 0) {
    userConfig.walletFactoryAddress = txDefaultOrig.walletFactoryAddress;
    localStorage.setItem("userConfig", JSON.stringify(userConfig));
  }
}

/**
* Reload configuration
*/
function loadConfiguration () {
  var userConfig = JSON.parse(localStorage.getItem("userConfig"));
  Object.assign(txDefault, txDefaultOrig, userConfig);
}

checkWalletFactoryAddress();
loadConfiguration();
