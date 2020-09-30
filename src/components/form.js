import React from "react";
import axios from "axios";

class Form extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  state = {
    name: "",
    email: "",
    confirmEmail: "",
    success: false,
    message: "",
    isModalOpen: true,
  };

  onChange(e) {
    // get target element name
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    const { name, email, confirmEmail } = this.state;
    if (name.length < 3) {
      document.getElementsByClassName("name_input")[0].style =
        "border:red 2px solid";
      alert("Must more than three characters");
    } else if (email !== confirmEmail) {
      document.getElementsByClassName("email_input")[0].style =
        "border:red 2px solid";
      document.getElementsByClassName("email_input2")[0].style =
        "border:red 2px solid";
      alert("Your password does not match");
    } else {
      document.getElementsByClassName("name_input")[0].style = "";
      document.getElementsByClassName("email_input")[0].style = "";
      document.getElementsByClassName("email_input2")[0].style = "";
      document.getElementsByClassName("submit-btn")[0].value =
        "Sending please wait";

      const body = JSON.stringify({
        name,
        email,
      });

      try {
        await axios.post(
          "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
          body
        );

        document.getElementsByClassName("submit-btn")[0].value = "Send";

        this.setState({ success: true });
      } catch (err) {
        document.getElementsByClassName("errorMessage")[0].innerHTML =
          err.response.data.errorMessage;
        document.getElementsByClassName("submit-btn")[0].value = "Send";

        setTimeout(() => {
          document.getElementsByClassName("errorMessage")[0].innerHTML = "";
        }, 6000);
      }
    }
  }

  render() {
    if (!this.state.success) {
      return (
        <div className="center">
          <div className="modal-header">Request an Invite</div>
          <div className="line center"></div>
          <form className="myForm" onSubmit={(e) => this.onSubmit(e)}>
            <input
              className="name_input"
              placeholder="Full name"
              type="text"
              name="name"
              style={{}}
              onChange={(e) => this.onChange(e)}
              required
            />
            <input
              className="email_input"
              placeholder="Email"
              type="email"
              name="email"
              onChange={(e) => this.onChange(e)}
              required
            />
            <input
              className="email_input2"
              placeholder="Confirm email"
              type="email"
              name="confirmEmail"
              onChange={(e) => this.onChange(e)}
              required
            />
            <input type="submit" className="btn submit-btn" value="Send" />
          </form>
          <div className="errorMessage"></div>
        </div>
      );
    } else {
      return (
        <div className="center box">
          <div className="box-size">
            <div className="modal-header">All done!</div>
            <div className="line center"></div>
            <div className="message">
              You will be one of the first to experience Broccoli & Co. when we
              launch.
            </div>
            <input
              type="submit"
              className="btn submit-btn2"
              value="OK"
              onClick={this.props.close}
            />
          </div>
        </div>
      );
    }
  }
}

export default Form;
