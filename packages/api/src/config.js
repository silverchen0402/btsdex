const defaultConfig = {
  name: "BitShares",
  coreAsset: "BTS",
  addressPrefix: "BTS",
  expireInSecs: 15,
  expireInSecsProposal: 24 * 60 * 60,
  reviewInSecsCommittee: 24 * 60 * 60,
  chainId: "cc488036251a422fca54ecae1d1150e5e52c99baa833f2097b577c80b732ba0f"
};

let networks = [
    defaultConfig,
    {
      name: "TestNet",
      coreAsset: "TEST",
      addressPrefix: "TEST",
      expireInSecs: 15,
      expireInSecsProposal: 24 * 60 * 60,
      reviewInSecsCommittee: 24 * 60 * 60,
      chainId:
        "39f5e2ede1f8bc1a3a54a7914414e3779e33193f1f5693510e73cb7a87617447"
    }
  ],
  current = null;

export const addConfig = config =>
  networks.push({ ...defaultConfig, ...config });

export const setConfig = chainId =>
  (current = networks.find(net => net.chainId === chainId));

export const getConfig = () => current;
