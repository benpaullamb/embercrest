enum KeyState {
  Down,
  Pressed,
  Up
}

interface ActiveKey {
  key: string;
  state: KeyState;
}

let activeKeys: ActiveKey[] = [];

const getActiveKey = (key: string): ActiveKey | undefined => {
  return activeKeys.find(activeKey => activeKey.key === key.toLowerCase());
};

export const updateInput = () => {
  activeKeys.forEach(key => {
    if (key.state === KeyState.Down) key.state = KeyState.Pressed;
  });

  activeKeys = activeKeys.filter(({ state }) => state !== KeyState.Up);
};

addEventListener('keydown', ({ key }: KeyboardEvent) => {
  const activeKey = getActiveKey(key);
  if (!activeKey) {
    activeKeys.push({
      key: key.toLowerCase(),
      state: KeyState.Down
    });
  }
});

addEventListener('keyup', ({ key }: KeyboardEvent) => {
  const activeKey = getActiveKey(key);
  if (activeKey) activeKey.state = KeyState.Up;
});

export default class Input {
  static getKeyDown(key: string): boolean {
    const activeKey = getActiveKey(key);
    if (activeKey) {
      return activeKey.state === KeyState.Down;
    }
    return false;
  }

  static getKey(key: string): boolean {
    const activeKey = getActiveKey(key);
    if (activeKey) {
      return activeKey.state === KeyState.Down || activeKey.state === KeyState.Pressed;
    }
    return false;
  }

  static getKeyUp(key: string): boolean {
    const activeKey = getActiveKey(key);
    if (activeKey) {
      return activeKey.state === KeyState.Up;
    }
    return false;
  }
}
