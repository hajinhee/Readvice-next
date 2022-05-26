import React, {useState} from 'react';
import { useDispatch, connect } from 'react-redux';
import { addRequest, deleteRequest } from '@/modules/board/addBoard';
import { AddBoard } from '@/components';

const AddBoardPage = () => {
    const [inputs, setInputs] =useState({
    name: "",
		phone: "",
		email: "",
		location: "",
		description: ""    })
    const dispatch = useDispatch()

    const onChange = e =>{
        e.preventDefault()
        const{name, value} = e.target;
        setInputs({...inputs,[name]: value})
    }

    const onSubmit = e => {
        e.preventDefault()
        alert('입력한 정보: '+JSON.stringify(inputs))
        dispatch(addRequest(inputs))
    }
  return (
    <AddBoard onChange={onChange} onSubmit={onSubmit}  />
  );
};

const mapStateToProps = state => ({ isAddBoard: state.addboard.isAddBoard })
const addboardActions = {addRequest, deleteRequest}

export default connect(mapStateToProps, addboardActions)(AddBoardPage)
