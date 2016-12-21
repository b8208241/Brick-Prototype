import React from 'react'

export default class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state={
      formState: {
        username: '',
        password: ''
      },
      currentlySending:false,
      error: ''
    }
    this._login = this._login.bind(this);
    this._changeForm = this._changeForm.bind(this);
  }

  _login () {
    console.log('enter _login')
    this.setState({
      currentlySending: true
    });
    this.props.loginFlow(this.state.formState).next();
  }

  _changeForm(newFormState) {
    this.setState({
      formState: newFormState
    })
  }

  render () {
    return (
      <div className=''>
        <h2 className=''>Login</h2>
        <Form
          formState={this.state.formState}
          changeForm={this._changeForm}
          onSubmit={this._login}
          error={this.state.error}
          currentlySending={this.state.currentlySending}
        />
      </div>
    )
  }
}


class Form extends React.Component {
  constructor (props) {
    super(props)
    this._onSubmit = this._onSubmit.bind(this)
    this._changeUsername = this._changeUsername.bind(this)
    this._changePassword = this._changePassword.bind(this)
    this._emitChange = this._emitChange.bind(this)
  }


    _changeUsername () {
      this._emitChange({...this.props.formState, username: this.userName.value})
    }

    _changePassword () {
      this._emitChange({...this.props.formState, password: this.password.value})
    }

    _emitChange (newFormState) {
      this.props.changeForm(newFormState)
    }

    _onSubmit (event) {
      console.log('enter form submit')
      event.preventDefault();
      this.props.onSubmit();
    }

  render () {
    let {error} = this.props;

    return (
      <form className='' onSubmit={this._onSubmit}>
        {error ? <ErrorMessage error={error} /> : null}
        <div className=''>
          <input
            className=''
            type='text'
            id='username'
            value={this.props.username}
            placeholder='帳號'
            ref={(input) => this.userName = input}
            onChange={this._changeUsername}
            autoCorrect='off'
            autoCapitalize='off'
            spellCheck='false' />
          <label className='' htmlFor='username'>
            帳號
          </label>
        </div>
        <div className=''>
          <input
            className=''
            id='password'
            type='password'
            value={this.props.password}
            placeholder='••••••••••'
            ref={(input) => this.password = input}
            onChange={this._changePassword} />
          <label className='' htmlFor='password'>
            Password
          </label>
        </div>
        <div className=''>
          {this.props.currentlySending ? (<LoadingButton />) : (<input className='' type='submit' value="登入"></input>)}
        </div>
      </form>
    )
  }
}

class ErrorMessage extends React.Component {
  render(){
    return (
      <div className=''>
        <p className=''>
          {this.props.error}
        </p>
      </div>
    )
  }
}

class LoadingButton extends React.Component {
  render(){
    return (
      <a href='#' className='' disabled='true'>
        <LoadingIndicator />
      </a>
    )
  }
}

class LoadingIndicator extends React.Component {
  render(){
  return (
    <div>
      Loading
      /*
      <div className='sk-fading-circle'>
        <div className='sk-circle1 sk-circle' />
        <div className='sk-circle2 sk-circle' />
        <div className='sk-circle3 sk-circle' />
        <div className='sk-circle4 sk-circle' />
        <div className='sk-circle5 sk-circle' />
        <div className='sk-circle6 sk-circle' />
        <div className='sk-circle7 sk-circle' />
        <div className='sk-circle8 sk-circle' />
        <div className='sk-circle9 sk-circle' />
        <div className='sk-circle10 sk-circle' />
        <div className='sk-circle11 sk-circle' />
        <div className='sk-circle12 sk-circle' />
      </div>
      */
    </div>
  )
  }
}
