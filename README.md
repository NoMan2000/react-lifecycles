# React Lifecycle Components

This lesson will guide you through the stages of the React lifecycle.  It's important to note that only a handful of them are ever used in 99% of the projects you will create, but the 1% of the time you need one of the others, it's useful to know what they do.

In addition to the lifecycle events, there are three distinct stages when a lifecycle event can be invoked.  These are the `mounting` stage, the `updating` stage, and the `unmounting` stage.  (Some people add the initialization stage, which is just the normal setup of any JavaScript class.)

### Old lifecycle

![Old lifecycle picture](https://cdn-images-1.medium.com/max/2000/1*sn-ftowp0_VVRbeUAFECMA.png
)

### New lifecycle

![New lifecycle picture](https://pbs.twimg.com/media/Dc2YU2aWsAAVbmk.jpg)


In addition to the stages of an event, there are also particular phases each lifecycle belongs to.  These are the `render` phase, the `pre-commit` phase, and the `commit` phase.

Some of the lifecycles covered here are deprecated.  You cannot use deprecating lifecycle events if the replacement lifecycle events `getDerivedStateFromProps` or `getSnapshotBeforeUpdate` are in the object.

## Render phase

 - During the render phase, everything should be purely functional with  no side effects.
 - Can be paused, aborted or restarted by React.
 - Because of the pure functions/no side effects rule, the static method `getDerivedStateFromProps` that's part of this phase must return an object rather than mutating one that already exists.

## Pre-commit phase

- Invoked right before the changes from the virtual DOM are reflected in the actual DOM.
- Safe to read from the DOM during this phase.
- Not many common use cases, but designed if you want to save a particular DOM entry before it gets changed.

## Commit phase

- This is when you can work with DOM, run side effects, and schedule updates.
- Can call setState safely.

Now, we will look at the actual lifecycle events themselves.

## Mounting Phase

### Constructor

The constructor is the first event that's called, receiving any props passed to it.

```jsx
constructor(props) {
  super(props);
}
```
Note that `super` must be called, or there will be no props set on the object.

The constructor is the only place where you should assign this.state directly.

```jsx
constructor(props) {
  super(props);
  this.state = {
    foo: 'bar'
  };
  this.somemethod.bind(this); // old way of doing this.
}
```

In all other methods, you need to use `this.setState()` instead.  Avoid introducing any side-effects or subscriptions in the constructor.  For those use cases, use `componentDidMount()` instead.

### ComponentWillMount (Deprecated)

componentWillMount is a deprecated lifecycle event, which we're covering because it's common to see in older code, and has a unique feature.  It was the only lifecycle hook called on server rendering and client rendering.

You are technically not supposed to call `setState` in componentWillMount, because this lifecycle is invoked immediately before mounting occurs, which means `render` hasn't been called yet.

Therefore setting state in this method will not trigger a re-render.  This is important since many state settings methods involve sending an asynchronous request to setState by fetching data, but since there will be no re-render, the results of the data fetch will have no effect.

Avoid introducing any side-effects or subscriptions in this method.  If you need to set state without doing an async request, you can usually just set it either in the constructor or set it directly in the newer syntax.

Old Version:
```jsx
  constructor(props) {
    super(props);
    this.state = {
      initialValue: props.value
    };
  }
```

Newer version:
```jsx
  this.state = {
    initialValue: props.value
  };
```

Due to these confusions and the anti-pattern of trying to set state asynchronously here, it's been deprecated and scheduled for removal in the next major release of React.

### ComponentDidMount

This is the work horse of the lifecycle events, it's the one you will see in code the most often and it's one of the most useful.

It's called once the VDOM is mounted and render has been run, enabling the use of `refs` or calls to `setState` with asynchronous methods to be done safely.

As a performance optimization, any calls to synchronous updating of state should be done in the `constructor`, since updating the state in `componentDidMount` will trigger a re-render.

```jsx
async componentDidMount() {
  const {data} = axios.get('example.com');
  this.setState({
    data
  });
}
```

### static getDerivedStateFromProps

getDerivedStateFromProps is one of the newer lifecycle events added in React 16.3.  It is also called on both server-side and client-side rendering.

The use case for it is if you pass something down the chain as a prop, and want to update the state using that prop.  It's also worth noting that this is generally considered a bad idea and should be avoided if possible, but there's some cases where you have to do that.

`getDerivedStateFromProps` is also one of the only methods that's invoked both during the mounting phase and during the updating phase. It's called when the component is initialized, when new props are received, and when a parent component is re-rendered.

If you use this, it is required that you not update state with it, (you won't have access to the `this` context), but instead return an object with the new state or null to avoid updating state.

```jsx
  static getDerivedStateFromProps(nextProps, nextState) {
  }
```
## Updating Phase

### componentWillReceiveProps (Deprecated)

Invoked every time new props are received, whether or not they are different from the current props.  Triggering setState here will not trigger a re-render, so should be avoided.  No values are expected to be returned.

```jsx
 componentWillReceiveProps(nextProps) {
    if (nextProps.foo !== this.props.foo) {
      this.performFooAction();
    }
```

### componentWillUpdate (Deprecated)

`componentWillUpdate` is invoked just before rendering when new props or state are being received. It is only called during update, not during mounting.

You should not call setState or a redux action here, as it will potentially not trigger a rerender.

```jsx
   componentWillUpdate(nextProps, nextState) {}
```

### shouldComponentUpdate

This lifecycle is designed to be used as an optimization step.  `shouldComponentUpdate` expects to receive a boolean.  If `true` is returned, then `componentWillUpdate`, `componentDidUpdate`, and `render` will be invoked.  If it returns false, none of these methods will be invoked.

Be cautious with overusing this, as one downside is if you add any props or state to an object, you **must** update the return value of `shouldComponentUpdate` or it will not render the changes.

```jsx
shouldComponentUpdate(prevProps, prevState) {
  return prevProps.foo !== this.props.foo;
}
```

### getSnapshotBeforeUpdate

This method is called before the virtual DOM makes a change to the DOM.  If you return a value from this, it will be the third parameter in `componentDidUpdate`.

The use case for it is fairly esoteric, but if you need to make a calculation and change based on the values of the current DOM and the next values of the DOM, this is the place for it.

```jsx
  listRef = React.createRef();

  getSnapshotBeforeUpdate(
    prevProps: Props,
    prevState: State
  ): Snapshot {
    // Are we adding new items to the list?
    // Capture the current height of the list so we can adjust scroll later.
    if (prevProps.list.length < this.props.list.length) {
      return this.listRef.value.scrollHeight;
    }

    return null;
  }

  componentDidUpdate(
    prevProps: Props,
    prevState: State,
    snapshot: Snapshot
  ) {
    // If we have a snapshot value, then we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    if (snapshot !== null) {
      this.listRef.value.scrollTop +=
        this.listRef.value.scrollHeight - snapshot;
    }
  }
```

### componentDidUpdate(prevProps, prevState, snapshot)

This method will get called after every rendering occurs. Since rendering has occurred, it is safe to perform any side-effects.

```jsx
componentDidUpdate(prevProps, prevState, snapshot) {
  if (this.state.foo !== prevState.foo) {
    this.bar = this.state.foo;
  }
}
```

## Unmounting

There is only one unmounting method.

### componentWillUnmount

Used the same as a destructor in other OOP languages.  Stop any async calls, remove any intervals running, and basically stop anything that will cause a memory leak or an error.

## Miscellaneous

### componentDidCatch

Normally if an error is thrown in a component, you get a white screen of death or an error page.

componentDidCatch allows you to perform some actions before that final disaster.

```jsx
componentDidCatch(error, info) {
  this.setState({hasError: true});
}
render () {
  const {hasError} = this.state;
  if (hasError) {
    return (<h1>We're sorry, but our system is currently down</h1>);
  } // else do normal stuff
}
```

- Ask pointed questions, make sure they're paying attention.
- More applicable demo.
