import React, { useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';

// import { Container } from './styles';
interface Props {
    data: any;
    onChange: any;
  }
const CustomSelect: React.FC<Props> = (props: Props) => {
    const [filter, setFilter] = useState();
    // debugger;
    // console.log(props.data);
  return <div > 
    <div className="content-section introduction"> <div className="card">
    <MultiSelect value={filter} optionLabel="label" optionValue="value" options={props.data} onChange={(e: any) => {
        setFilter(e.value);
        console.log(e.value);
        props.onChange(e.value);
    }}  ></MultiSelect>
    </div>
    </div>
  </div>;
}

export default CustomSelect;