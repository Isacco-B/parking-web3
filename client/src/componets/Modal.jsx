import React from "react";

function Modal({ setShowModal, showModal, eventName, data, eventTrans }) {
  console.log(eventName)
  console.log(data);
  console.log(eventTrans);
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="p-5 border-b border-solid rounded-t">
                  <h3 className="text-3xl font-semibold">Event Details</h3>
                </div>
                <div className="relative p-6 flex flex-col">
                  <h1>{}</h1>
                  <div className="flex flex-row"></div>
                  <h3>{}</h3>
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    {}
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Modal;
