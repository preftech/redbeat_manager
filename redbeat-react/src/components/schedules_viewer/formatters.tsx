import * as React from 'react';
//import { render } from 'react-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

/**
 * return json object formatted
 */
export function JsonFormatter (props : any){ 
  
    const cellData = props.cell.getValue() || {}; 
    console.log(cellData)
    return (<SyntaxHighlighter 
                  style={docco}
                  wrapLines={true}
                  wrapLongLines={true}>{JSON.stringify(cellData, null, 2)}</SyntaxHighlighter>)
};

export function SchedulesFormatter (props : any) { 
  
  const cellData: any = props.cell.getValue() || {};  
  
  if (cellData.__type__ === "interval") {
  
    return (<div><b>{cellData.__type__}</b><br/>{cellData.every}</div>);
  
  } 
  
  return (<div>
              <b>{cellData.__type__}</b>
              <br/>
            {cellData.day_of_month} {cellData.day_of_week} {cellData.hour} {cellData.minute} {cellData.month_of_year}
          </div>);

};
