import React from "react";
//import "./styles.css";

//import DateEditor from "react-tabulator/lib/editors/DateEditor";
//import MultiValueFormatter from "react-tabulator/lib/formatters/MultiValueFormatter";
//import MultiSelectEditor from "react-tabulator/lib/editors/MultiSelectEditor";

import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)

import { reactFormatter, ReactTabulator} from "react-tabulator"; 
import {JsonFormatter, SchedulesFormatter} from "./formatters";
import JSONEditor from './JSONEditor';
import "./custom.css";

interface IProps {}
interface IState {
    data : any
}

class ScheduleViewer extends React.Component<IProps, IState>  {

    ref: ReactTabulator | null = null;
    
    constructor(props: IProps) {
        super(props);
        this.state = {data: []};
        
    }

        
    componentDidMount() {
        fetch('/schedules').then(res => res.json()).then(data => {
            this.setState({data: data.result});
        });
    }
    columns = [
        { title: "Name", field: "name", width: 150 },
        { title: "Task", field: "task", hozAlign: "left"},
        { title: "Args", field: "args", hozAlign: "left", editor:JSONEditor, formatter: reactFormatter(<JsonFormatter/>)},
        { title: "Enabled", field: "enabled", hozAlign: "left", formatter: 'tickCross'},
        { title: "Options", field: "options", hozAlign: "left", editor:JSONEditor, formatter: reactFormatter(<JsonFormatter/>)},
        { title: "Schedule", field: "schedule", hozAlign: "left", editor:JSONEditor, formatter: reactFormatter(<SchedulesFormatter/>)},
        { title: "KWArgs", field: "kwargs", hozAlign: "left", editor:JSONEditor, formatter: reactFormatter(<JsonFormatter/>)}
    ];


    render() {
        

        const options = {
            movableRows: false,
            resizableRows:true, 
            resizableColumns:true,
            layout:"fitColumns"
        };
        return (
            <div>
                <ReactTabulator
                    ref={(ref) => (this.ref = ref)}
                    columns={this.columns}
                    data={this.state.data}
                    options={options}
                   
                />
            </div>
        );
    }
}

export default ScheduleViewer;
