import pinImage from './pin.png';
import flowers from './flowers.png';
import React, { Component } from 'react';


class ToDoApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
			newTask: ''
		};
	}

	componentDidMount() {
		const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
		this.setState({ tasks: savedTasks });
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.tasks !== this.state.tasks) {
			localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
		}
	}

	componentWillUnmount() {
		console.log('Component Deleted');
	}

	inputValue = (e) => {
		this.setState({ newTask: e.target.value });
	}

	addTask = () => {
		if (this.state.newTask.trim()) {
			this.setState((prevState) => ({
				tasks: [...prevState.tasks, prevState.newTask],
				newTask: ''
			}));
		}
	}

	deleteTask = (index) => {
		this.setState((prevState) => ({
			tasks: prevState.tasks.filter((task, i) => i !== index)
		}));
	}

	updateTask = (index, newTask) => {
		this.setState((prevState) => {
			const tasks = [...prevState.tasks];
			tasks[index] = newTask;
			return { tasks };
		});
	}

	render() {
		return (
			<>
				<h3>CODSOFT TASK 2</h3>
				<img src={flowers} className='flowers'/>
				<div className="container">
					<input
						className='type_bar'
						type="text"
						value={this.state.newTask}
						onChange={this.inputValue}
						placeholder="Enter a new task"
					/>
					<button className='Add_btn' onClick={this.addTask}>ADD</button>
				</div>
				<div className='Board'>
					<ul>
						{this.state.tasks.map((task, index) => (
							<li key={index}>
								<img src={pinImage} className='pin' />
								<textarea
									className='input_element'
									type="text"
									value={task}
									onChange={(e) => this.updateTask(index, e.target.value)}
								/>
								<button onClick={() => this.deleteTask(index)}><i className="fa-solid fa-trash-can"></i></button>
							</li>
						))}
					</ul>
				</div>
				
			</>
		);
	}

}

export default ToDoApp;
