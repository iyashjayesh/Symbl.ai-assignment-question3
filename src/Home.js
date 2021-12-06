import React from "react";
import './App.css';

class Home extends React.Component {

	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			items: [],
            unsotred: [],
			DataisLoaded: false
		};
	}

	// ComponentDidMount is used to
	// execute the code
	componentDidMount() {

        fetch("https://symbl-ai-assignment-example-1.herokuapp.com/get-data/")
            .then((res) => res.json())
            .then((j) => {
                console.log(j);
                this.setState({
                    unsotred: j
                });
            });
        
		fetch("https://symbl-ai-assignment-example-1.herokuapp.com/get-data/")
			.then((res) => res.json())
			.then((json) => {
                json.data.sort((a, b) => a.id - b.id);
                this.setState({
                    items: json,
                    DataisLoaded: true
                }); 
            });
	}
	render() {
		
        const { DataisLoaded, items } = this.state;
		const { unsotred } = this.state;

        if (!DataisLoaded) return <div>
			<h1> Pleses wait some time.... </h1> </div> ;

		return (
		<div className = " container pt-5">
            <div className="row text-center">
                <strong>
                    <h1>symbl.ai - Assignmnet </h1>
                </strong>
                <h1> Fetching data from the api..  <a target="_blank" rel="noreferrer" href="https://symbl-ai-assignment-example-1.herokuapp.com/get-data/">Example 1(endpoint)</a></h1>
                <div className="card p-4 mt-5">
                    <h1>Unsorted Data</h1>
                        <div className="inner-card p-2 pt-3">
                            {
                                unsotred.data.map((item) => (
                                <ol key = { item.id } >
                                    Id: { item.id } | Name: { item.name }
                                    </ol>
                                ))
                            }
                        </div>
                </div>
                <div className="card p-4 mt-5">
                    <h1>Sorted Data</h1>
                    <div className="inner-card p-2 pt-3">
                        {
                            items.data.map((item) => (
                            <ol key = { item.id } >
                                Id: { item.id } | Name: { item.name }
                                </ol>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
	);
}
}

export default Home;
