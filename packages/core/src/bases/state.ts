import {
  Actions,
  AppEnv,
  Mutable,
  State,
  StateActions,
  WalletStatus,
} from '../types';
import { getWalletStatusFromState } from '../utils';

export class StateBase<T> {
  protected _mutable: Mutable<T>;
  actions?: StateActions<T>;
  protected _env?: AppEnv;

  constructor() {
    this._mutable = { state: State.Init };
  }

  get env() {
    return this._env;
  }

  setEnv(env?: AppEnv) {
    this._env = env;
  }

  setActions = (actions: Actions) => {
    this.actions = actions;
  };

  get isMobile() {
    return this.env?.device === 'mobile';
  }

  get emitState() {
    return this.actions?.state;
  }

  get emitData() {
    return this.actions?.data;
  }

  get emitMessage() {
    return this.actions?.message;
  }

  get mutable() {
    return this._mutable;
  }

  get state() {
    return this.mutable.state;
  }

  get isInit() {
    return this.state === State.Init;
  }

  get isDone() {
    return this.state === State.Done;
  }

  get isError() {
    return this.state === State.Error;
  }

  get isPending() {
    return this.state === State.Pending;
  }

  get data() {
    return this.mutable.data;
  }

  get message() {
    return this.mutable.message;
  }

  setState(state: State) {
    this._mutable.state = state;
    this.emitState?.(state);
  }

  setData(data: T | undefined) {
    this._mutable.data = data;
    this.emitData?.(data);
  }

  setMessage(message: string | undefined) {
    this._mutable.message = message;
    this.emitMessage?.(message);
  }

  reset() {
    this.setData(undefined);
    this.setMessage(undefined);
    this.setState(State.Init);
  }

  get walletStatus() {
    return getWalletStatusFromState(this.state, this.message);
  }

  get isWalletConnecting() {
    return this.walletStatus === WalletStatus.Connecting;
  }

  get isWalletConnected() {
    return this.walletStatus === WalletStatus.Connected;
  }

  get isWalletDisconnected() {
    return this.walletStatus === WalletStatus.Disconnected;
  }

  get isWalletRejected() {
    return this.walletStatus === WalletStatus.Rejected;
  }

  get isWalletNotExist() {
    return this.walletStatus === WalletStatus.NotExist;
  }

  get isWalletError() {
    return this.walletStatus === WalletStatus.Error;
  }
}
