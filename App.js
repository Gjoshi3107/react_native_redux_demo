/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ADD_NEW_EMPLOYEE, ADD_LEFT_EMPLOYEE } from './redux/action'
import { getStateFromStore } from './index';

type Props = {};
class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      ADD: "none",
      REMOVE: "none",
      GETDATA: "none",
      Name: "",
      Executive: "",
      TL: "",
      Employee: "YES",
      input: "",
      datae: [],
      id: "",
    };
    this.empOutput = this.empOutput.bind(this);
    this.NEW = this.NEW.bind(this);
    this.LEFT = this.LEFT.bind(this);
    this.GET = this.GET.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateExec = this.updateExec.bind(this);
    this.updateTL = this.updateTL.bind(this);
    this.state_clean = this.state_clean.bind(this);
    this.openGETDATA = this.openGETDATA.bind(this);
  }

  //TextInput Methods
  updateID(input) {
    this.setState({ id: input });
  };
  updateInput(inpu) {
    this.setState({ input: inpu });
  };
  updateName(input) {
    this.setState({ Name: input });
  };
  updateExec(input) {
    this.setState({ Executive: input });
  };
  updateTL(input) {
    this.setState({ TL: input });
  };

  //employee list
  empOutput = () => {
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={info => (
          <View>
            {info}
          </View>
        )}
      />
    )
  }

  //display method
  openAddEMP = () => {
    if (this.state.ADD === "none")
      this.setState({ ADD: "flex", REMOVE: "none", GETDATA: "none" });
    else
      this.setState({ ADD: "none" });
    this.setState({ Name: "", Executive: "", TL: "", input: "", id: "", });

  }
  openLEFTEMP = () => {
    if (this.state.REMOVE === "none")
      this.setState({ REMOVE: "flex", ADD: "none", GETDATA: "none" });
    else
      this.setState({ REMOVE: "none" });
    this.setState({ Name: "", Executive: "", TL: "", input: "", id: "", });
  }
  openGETDATA = () => {
    if (this.state.GETDATA === "none")
      this.setState({ GETDATA: "flex", REMOVE: "none", ADD: "none" });
    else
      this.setState({ GETDATA: "none" });
    this.setState({ Name: "", Executive: "", TL: "", input: "", id: "", });

  }

  //redux methods
  NEW() {
    if (this.state.id === "" || this.state.Name === "" || this.state.Executive === "" || this.state.TL === "") {
      alert("PLEASE ENTER EMPLOYEE DETAILS.")
    }
    // else if (this.state.Name === "") {
    //   alert("PLEASE ENTER EMPLOYEE NAME.")
    // }
    else if (this.state.Executive !== "YES" && this.state.Executive !== "Yes" && this.state.Executive !== "NO" && this.state.Executive !== "No" && this.state.Executive !== "yes" && this.state.Executive !== "no") {
      alert("PLEASE ENTER ONLY {YES/NO,Yes/No or yes/no} IN EXECUTIVE CRITERIA.")
    }
    else if (this.state.TL !== "YES" && this.state.TL !== "Yes" && this.state.TL !== "NO" && this.state.TL !== "No" && this.state.TL !== "yes" && this.state.TL !== "no") {
      alert("PLEASE ENTER ONLY {YES/NO,Yes/No or yes/no} IN TEAM LEAD CRITERIA.")
    }
    else {
      this.state.datae.push(this.state.id);
      this.state.datae.push(this.state.Name);
      this.state.datae.push(this.state.Employee);
      this.state.datae.push(this.state.Executive);
      this.state.datae.push(this.state.TL);
      this.setState({ id: '', Name: '', Executive: '', TL: '' });
      this.props.ADDEMP(this.state.datae);
      alert(this.state.datae);
      this.state_clean();
    }
  }

  LEFT() {
    var idd = this.state.input;
    var data = this.props.data.empDATA[idd];
    if (idd === "") {
      alert("PLEASE ENTER EMPLOYEE ID.")
    }
    else if (data == null) {
      alert("NO EMPLOYEE WITH SUCH EMPLOYEE ID.")
    }
    else {
      this.props.REMEMP(this.state.input);
      this.state_clean();
    }
    // setTimeout(this.setState({input: ''}),500);
  }

  GET() {
    var idd = this.state.input;
    var data = this.props.data.empDATA[idd];
    if (idd === "") {
      alert("PLEASE ENTER EMPLOYEE ID.")
    }
    else if (data == null) {
      alert("NO EMPLOYEE WITH SUCH EMPLOYEE ID.")
    }
    else
      alert(JSON.stringify(data));
  }

  state_clean() {
    this.setState({ datae: [], input: '' });
  }

  render() {
    return (
      <View>
        <Text style={{ paddingTop: 15, textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: '#000' }}>EMPLOYEE LIST</Text>
        <View style={{ padding: 15, flexDirection: 'row' }}>
          <View style={{ paddingLeft: 15 }}>
            <TouchableOpacity onPress={this.openAddEMP}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'skyblue' }}> Add Employee</Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingLeft: 105 }}>
            <TouchableOpacity onPress={this.openLEFTEMP}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'skyblue' }}> Employee Left</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ display: this.state.ADD }}>
          <View style={{ padding: 15, flexDirection: 'row' }}>
            <View>
              <Text style={{ padding: 15, fontWeight: 'bold', fontSize: 13, color: '#000' }}> ID</Text>
              <Text style={{ padding: 15, paddingTop: 22.5, fontWeight: 'bold', fontSize: 13, color: '#000' }}> Employee Name</Text>
              <Text style={{ padding: 15, paddingTop: 22.5, fontWeight: 'bold', fontSize: 13, color: '#000' }}> Is Executive</Text>
              <Text style={{ padding: 15, paddingTop: 22.5, fontWeight: 'bold', fontSize: 13, color: '#000' }}> Is Team Lead</Text>
            </View>
            <View>
              <View style={{ paddingLeft: 55, paddingTop: 7.5 }}>
                <TextInput
                  style={{ paddingLeft: 15, width: 150, height: 40, borderColor: 'gray', borderWidth: 1 }}
                  value={this.state.id}
                  onChangeText={(text) => this.updateID(text)}
                />
              </View>
              <View style={{ paddingLeft: 55, paddingTop: 15 }}>
                <TextInput
                  style={{ paddingLeft: 15, width: 150, height: 40, borderColor: 'gray', borderWidth: 1 }}
                  value={this.state.Name}
                  onChangeText={(text) => this.updateName(text)}
                />
              </View>
              <View style={{ paddingLeft: 55, paddingTop: 15 }}>
                <TextInput
                  style={{ paddingLeft: 15, width: 150, height: 40, borderColor: 'gray', borderWidth: 1 }}
                  value={this.state.Executive}
                  onChangeText={(text) => this.updateExec(text)}
                />
              </View>
              <View style={{ paddingLeft: 55, paddingTop: 15 }}>
                <TextInput
                  style={{ paddingLeft: 15, width: 150, height: 40, borderColor: 'gray', borderWidth: 1 }}
                  value={this.state.TL}
                  onChangeText={(text) => this.updateTL(text)}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={this.NEW}>
            <Text style={{ paddingTop: 15, textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: 'skyblue' }}> Add </Text>
          </TouchableOpacity>
        </View>
        <View style={{ display: this.state.REMOVE }}>
          <View style={{ padding: 15, flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#000' }}>Enter the ID of Employee that Left</Text>
            <View style={{ paddingLeft: 15 }}>
              <TextInput
                style={{ paddingLeft: 15, width: 150, height: 40, borderColor: 'gray', borderWidth: 1 }}
                value={this.state.input}
                onChangeText={(text) => this.updateInput(text)}
              />
            </View>
          </View>
          <TouchableOpacity onPress={this.LEFT}>
            <Text style={{ paddingTop: 15, textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: 'skyblue' }}> Update </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={getStateFromStore}>
          <Text style={{ paddingTop: 15, textAlign: 'center', fontWeight: 'bold', fontSize: 17, color: 'darkblue' }}> Get Current State (Store.get() method) </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.openGETDATA}>
          <Text style={{ paddingTop: 15, textAlign: 'center', fontWeight: 'bold', fontSize: 17, color: 'darkblue' }}> Get Employee Data By ID (mapStateToProps method) </Text>
        </TouchableOpacity>
        <View style={{ display: this.state.GETDATA, }}>
          <View style={{ padding: 15 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#000', textAlign: 'center' }}>Enter the ID of Employee to retrieve his data:-</Text>
            <View style={{ alignItems: 'center', paddingTop: 15 }}>
              <TextInput
                style={{ paddingLeft: 15, width: 150, height: 40, borderColor: 'gray', borderWidth: 1 }}
                value={this.state.input}
                onChangeText={(text) => this.updateInput(text)}
              />
            </View>
          </View>
          <TouchableOpacity onPress={this.GET}>
            <Text style={{ paddingTop: 15, textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: 'skyblue' }}> Get </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { data: state };
};


function mapDispatchToProps(dispatch) {
  return {
    ADDEMP: (article) => { dispatch(ADD_NEW_EMPLOYEE(article)) },
    REMEMP: (article) => { dispatch(ADD_LEFT_EMPLOYEE(article)) }
  };
}

const Connect = connect(mapStateToProps, mapDispatchToProps)(App);
export default Connect;