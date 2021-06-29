import React from "react";

export default class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listName : props.listName,
            loading : true,
            items: []
        }
    }



    async componentDidMount() {
        const url = "http://localhost:3000/api/items?listName="+ this.state.listName;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({items: data, loading: false});
    }

    render() {
        if (this.state.loading) {
            return <div>Loading...</div>;
        }

        if (!this.state.items.length) {
            return <div>Empty List</div>;
        }

        return (
            <div>
                {this.state.items.map(item => (
                    <div key={item.id}>
                        {item.itemName+": "}
                        {item.itemFinished ?
                            <font color="green">Finished</font> :
                            <font color="#8b0000">Not Finished</font>}
                    </div>
                ))}
            </div>
        )

    }
}