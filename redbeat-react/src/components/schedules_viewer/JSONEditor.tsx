import React from 'react';
import { render } from 'react-dom';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';

interface IProps {
    cell: any;
    onRendered: (fn: any) => void;
    success: (value: any) => void;
    cancel: () => void;
    editorParams?: any;
}

class Editor extends React.Component<IProps> {

    state = { value: '' };
    ref: any = null;

    componentDidMount() {
        this.props.onRendered(() => {
            const value = this.props.cell.getValue();
            this.setState({ value });
            this.ref.focus();
        });
        
    }

    setValueOnSuccess = (value = this.state.value) => {
        const { success } = this.props;
        success(value);
    };

    onChange = (ev: any) => {
        const value = ev.target.value;
        this.setState({ value });
    };

    onBlur = () => {
        this.setValueOnSuccess();
    };
    
    render() {
        const { cell } = this.props;
        let content = JSON.stringify(cell.getValue(), null, 2)
        return (<TextareaAutosize 
                        rows={10} 
                        ref={r => (this.ref = r)}
                        value={content}
                        defaultValue={content}/>)
    };

}


export default function(
                        cell: any,
                        onRendered: (fn: any) => void,
                        success: (value: any) => void,
                        cancel: () => void,
                        editorParams?: any
                ) {
    const container = document.createElement('div');
    container.style.height = '100%';
    render(
            <Editor cell={cell} onRendered={onRendered} success={success} cancel={cancel} editorParams={editorParams} />,
            container
    );
    return container;
};
