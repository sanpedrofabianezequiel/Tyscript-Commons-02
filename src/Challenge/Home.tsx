import React, { useEffect, useMemo, useState } from 'react'
import { SearchModel, Convert, Name, Result, Title } from './Model';
import { useForm } from './useForm';

export const Home = () => {


    const [data, setData] = useState<SearchModel>();
    const [names, setNames] = useState<Result[]>();

    const handleSearch =(e:any)=>{
        e.preventDefault();
        
        getData()
            .then(
                x => {
                   const value: SearchModel = x;
                   setData(value);
                }
            )
       
    }

    const getData = async ()=>{
        const resp =  await fetch('https://randomuser.me/api/?results=100');
        const body =  await resp.json();
        return body;
    }


    useEffect(() => {
        if(data){
            const {results} = data!; 
            setNames(results);
        }
        
    }, [handleSearch])

    const [ formValues, handleInputChange ] = useForm({
        searchText : ''
    });
    
    const  {searchText}:any = formValues;


   

    const  getNamesFilter= (search:string = '')=>{
        if(search === '') return names;

        search =search.toLocaleLowerCase();
        return names?.filter( x=> x.name.first.toLocaleLowerCase().includes(search));
    }
    const namesFiltered =  useMemo(() => getNamesFilter(searchText),[searchText]);

    return (
        <>
            <h1>Challenge</h1>   
            <form onSubmit = {handleSearch}>
                <div className="form-group">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Correo"
                        name="searchText"
                        value={searchText }
                        onChange={handleInputChange}
                        
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="submit"
                        className="btnSubmit"
                        value="Search" 
                    />
                </div>
            </form>

            <h1>Resultados</h1>
            <ul>
            {
                 namesFiltered && namesFiltered.map(
                     (x,index)=> (
                         <li key={index}>{x.name.first} - {x.name.last} </li>
                         
                     )
                 )
             }
            </ul>
        </>
    )
}
