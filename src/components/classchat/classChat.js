import React, { Component } from "react";
import { connect } from "react-redux";

export class classChat extends Component {
  render() {
    return <div>classChat</div>;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(classChat);
