import { useAuth } from "../AuthProvider";
import { NavLink, useNavigate } from 'react-router-dom';
import { Nav } from "../Nav";
import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { InputField } from '../InputField';
import { Income as IncomeType } from '../../types/income'; 
import axios from "axios";




export const Income = () => {

    const { user } = useAuth(); 
    const navigate = useNavigate(); 
    const [open, setOpen] = useState<boolean | null >(false)
    const backend_url = import.meta.env.VITE_BASE_URL 


    const incomeValues: IncomeType = {
        userId: user?.auth_id || '', 
        source: '',
        amount: 0,
        frequency: "Monthly"
    }

    const [incomeForm, setIncomeForm] = useState<IncomeType>(incomeValues)

    const toggleOpen = () => {
        setOpen(!open)
    }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setIncomeForm({
            ...incomeForm,
            [name]: value
        })
    }

    const handleSubmitIncome = async (e: any) => {
        e.preventDefault()
        try {
            if (!incomeForm.source || !incomeForm.amount || !incomeForm.frequency) {
              alert("Please fill out all fields")
              return;
            }
            const response = await axios({
              method: 'post',
              url: `${backend_url}/income`,
              data: {
                amount: incomeForm.amount,
                frequency: incomeForm.frequency,
                source: incomeForm.source,
                userId: incomeForm.userId,
              }
            })
            if (response)  {
              setOpen(false)
              setIncomeForm({
                userId: user?.auth_id || '',
                source: '',
                amount: 0.00,
                frequency: ''
            })
            }
            else {
              throw Error("No response")
            }
        }
        catch (err: any) {
            console.error(err)
        }
    }


    return (
        <div className="block">
            <Nav/> 
                <header className="bg-white shadow">
                <div className="flex justify-between mx-auto max-w-7xl px-3 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Net Worth</h1>
                    
                </div>
                </header>
                <main>
                <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 items-end justify-end">
                    <button onClick={toggleOpen} className="rounded-md text-s font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 outline-none">
                            + Add Net Worth
                    </button>
                </div>
                </main>
                <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-center">
               
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h2" className="text-base font-semibold text-gray-900">
                    Add Income 
                  </DialogTitle>
                  <div className="">
                    <form>
                        <div className="space-y-12">
                            <div className="border-gray-900/10 pb-12">
                            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <InputField
                                            label="Source"
                                            name="source"
                                            type="text"
                                            value={incomeForm.source}
                                            placeholder="Employment Income"
                                            labelColor="text-gray-900"
                                            onChange={handleInputChange}
                                            />
                              </div>
                              <div className="sm:col-span-2">
                                <label htmlFor="frequency" 
                                        className=" text-gray-900 dark:text-white block text-sm/6 font-medium mb-1 ">
                                        Select an option
                                </label>
                                    <select id="frequency" 
                                            name="frequency"
                                            value={incomeValues.frequency}
                                            required 
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       >
                                        <option value="Daily">Daily</option>
                                        <option value="Weekly">Weekly</option>
                                        <option value="Biweekly">Bi-Weekly</option>
                                        <option value="Monthly">Monthly</option>
                                    </select>
                                </div>
                                <div className="sm:col-span-3">
                                <InputField
                                    label="Amount After Tax"
                                    name="amount"
                                    type="currency"
                                    value={incomeForm.amount}
                                    placeholder="5000.00"
                                    labelColor="text-gray-900"
                                    onChange={handleInputChange}
                                    
                                    />
                                </div>
                               
                                </div>
                          
                        </div> 
                        </div> 
              <div className="py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    onClick={handleSubmitIncome}
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Save
                  </button>
                
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
            </div>
                    </form> 
                  </div>
                </div>
              </div>
            </div>
           
          </DialogPanel>
        </div>
      </div>
    </Dialog>
        </div>
    )
}