// NOTE: We explicitly export the symbols in the root index.ts file to have better control over package's public API.
export {
  ChainId,
  BNB,
  BUSD, DEFAULT_SUPPORTED_CHAINS,
  Dai,
  ERC20,
  ERC20Interface,
  ERC20Mock,
  ERC20MockInterface,
  Ether, KovanDai,
  KovanEther,
  MultiCall,
  MultiCall2,
  MultiCall2ABI,
  MultiCallABI, NATIVE_CURRENCY, TestBNB,
  TestBUSD
} from './constants'
export type {
  Chain,
  Config, FullConfig, MulticallAddresses, NodeUrls
} from './constants'
export {
  DAppProvider, getStoredTransactionState,
  multicall,
  multicall2,
  useBlockNumber,
  useConfig,
  useNetwork,
  useUpdateConfig
} from './providers'
export type {
  DAppProviderProps,
  AddNotificationPayload,
  RemoveNotificationPayload,
  ChainState,
  Notification,
  Notifications,
  RawCall,
  RawCallResult,
  State,
  StoredTransaction,
  StoredTransactions,
  Network
} from './providers'
export {
  useBlockMeta,
  useCall,
  useCalls,
  useContractCall,
  useContractCalls,
  useChainCall,
  useChainCalls,
  useChainMeta,
  useChainState,
  useContractFunction,
  useEtherBalance,
  useEthers,
  useGasPrice,
  useLookupAddress,
  useMulticallAddress,
  useNotifications,
  useSendTransaction,
  useToken,
  useTokenAllowance,
  useTokenBalance,
  useTokenList, useTransactions
} from './hooks'
export type {
  Call,
  ContractCall,
  Web3Ethers, TokenList
} from './hooks'
export {
  Currency,
  CurrencyValue,
  FiatCurrency,
  NativeCurrency,
  Token, transactionErrored
} from './model'
export type {
  CurrencyFormatOptions,
  TransactionOptions,
  TransactionState,
  TransactionStatus
} from './model'
export * from './model/chain'
export {
  isLocalChain,
  isTestChain,
  addressEqual,
  compareAddress,
  shortenAddress,
  shortenIfAddress,
  shortenIfTransactionHash,
  shortenTransactionHash,
  getChainName,
  getExplorerAddressLink,
  getExplorerTransactionLink
} from './helpers'
export type { CallResult } from './helpers'

