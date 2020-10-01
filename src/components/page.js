import React from "react";
import Form from "./form";
import { Modal, Button } from "react-materialize";

class Page extends React.Component {
  constructor() {
    super();
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  state = { isModalOpen: "" };

  async handleCloseModal() {
    this.setState({ isModalOpen: false });
    setTimeout(() => {
      this.setState({ isModalOpen: "" });
    }, 1000);
  }

  render() {
    return (
      <section className="container center middle-section">
        <div className="middle-wrapper">
          <div>
            <span className="slogon">A better way to enjoy everyday.</span>
          </div>
          <div>
            <span className="sec-slogon">
              Be the first to know when we launch
            </span>
          </div>
          <div>
            <Modal
              dialogclassname="custom-dialog"
              open={this.state.isModalOpen}
              trigger={<Button className="btn">Request an invite</Button>}
            >
              <Form close={this.handleCloseModal} />
            </Modal>
          </div>
        </div>
      </section>
    );
  }
}

export default Page;
