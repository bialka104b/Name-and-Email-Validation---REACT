import React from 'react';
import './App.css';

class App extends React.Component {
  state= {
    inputName: '',
    inputEmail: '',
    nameTouch: false,//czy pole name było już wpisywane
    emailTouch: false,//czy pole email było już wpisywane
    nameCorrect: false, //wartość false jeśli nie mamy nic wpisane do pola Name
    emailCorrect: false //wartość false jeśli nie mamy nic wpisane do pola Name
  }

  //funkcja przyjmuje jako parametr event na jakim wykonujemy to zdarzenie
  handleInputName = (e) => {
    //console.log(e.target.value);//e.target.value da mi dostęp do wpisywanego tekstu
    this.setState({
      inputName: e.target.value,
      nameTouch: true
    }, 
      ()=>{this.handleCheckName()}//to musi byc wpisane jako callback aby miec pewnośc że za każdym razem gdy usuniemy jakiś znak to się sprawdzi
    );
  }
  handleInputEmail = (e) => {
    //console.log(e.target.value);//e.target.value da mi dostęp do wpisywanego tekstu
    this.setState({
      inputEmail: e.target.value,
      emailTouch: true
    }, 
      ()=>{this.validateEmail()}//to musi byc wpisane jako callback aby miec pewnośc że za każdym razem gdy usuniemy jakiś znak to się sprawdzi
    );
  }
  handleCheckName = () => {//walidacja imienia
    if(this.state.inputName.length <= 3) {//sprawdzam czy długośc wpisanego imienia jest krótsza niż 3 litery
      this.setState({
        nameCorrect: false //aktualizacja state name Correct
      })
    } else {//jeśli imie ma 3 i więcej litery wykonaj
      this.setState({
        nameCorrect: true //aktualizacja state name Correct
      })
    }
  }

  validateEmail = () => {//walidacja maila
    //wymagana linijka komentarza do zignorowania błędu generowanego przez es lint
    // eslint-disable-next-line 
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const reTestString = re.test(String(this.state.inputEmail).toLowerCase())
    if(reTestString){//metoda test zwróci czy mail pasuje czy nie
      this.setState({
        emailCorrect: true
      })
    } else {this.setState({emailCorrect: false})}
  }
  
  handleSend = ()=> {
    this.setState({
      // ustawiamy żeby po wysyłce formularz był pusty
      inputName: '',
      inputEmail: '',
      nameTouch: false,
      emailTouch: false,
      nameCorrect: false,
      emailCorrect: false
    })
  }
  
  render(){
      return (
      <div className="box">
        {/* {this.state.inputName} sprawdzam czy inputName jest równy wartości która wpisuje*/}
        {/* {this.state.nameCorrect.toString()} */}
        {/* {this.state.inputName.length} */}

        {/* WALIDACJA IMIENIA */}
        <div className="box__item">
          <label className="box__label">Name: </label>
          <input 
          className="box__input" 
          type="text" 
          name="name"
          onChange={this.handleInputName} //na zmiane inputa wywołaj metode handleInputName
          />
          {/* SPRAWDZAM CZY nameCorrect jest true czy false , jeśli jest true to nie wyświetlam spana*/}
          {(this.state.nameTouch && !this.state.nameCorrect) ? 
          <span className="box__error">Błąd. Wpisz conajmniej 3 litery</span> : ''}
        </div>
        
        {/* OBSŁUGA MAILA */}
        <div className="box__item">
          <label className="box__label">Email: </label>
          <input 
          className="box__input" 
          type="text" 
          name="name"
          onChange={this.handleInputEmail} //na zmiane inputa wywołaj metode handleInputEmail
          />
          {(this.state.emailTouch && !this.state.emailCorrect) ? 
          <span className="box__error">źle wpisałeś maila</span> : ''}
        </div>

        {/* WYSYŁANIE FORMULARZA */}
        <div className="box__button">
          <button className="box__btn" onClick="handleSend">Wyślij</button>
        </div>
      </div>
    );
  }
}

export default App;
