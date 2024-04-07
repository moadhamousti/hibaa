// "use client"
// import axios from "axios";
// import { useState } from "react";
// import { RiLoader5Fill } from "react-icons/ri";
// import addToMailingList from "../api/mailingList/route";

// const Newsletter = () => {
//   const [email, setEmail] = useState(""); // Change mail to email
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false); // Initialize success state to false
//   const [messageState, setMessageState] = useState("");

//   const Subscribe = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await addToMailingList(email); // Pass email to addToMailingList
//       setLoading(false);
//       setSuccess(true);
//       setMessageState(response.data.message);
//     } catch (err) {
//       setLoading(false);
//       setMessageState(String(err.message));
//     }
//   };

//   return (
//     <section className="container mx-auto my-10 max-w-7xl px-4 sm:px-6 lg:px-8">
//       <div className="grid items-center gap-10 bg-black py-[15%] px-[6%] dark:bg-zinc-900 md:p-[6%] lg:grid-cols-2">
//         <div>
//           <h3 className="text-5xl font-semibold text-white">
//             Join my newsletter
//           </h3>
//           <p className="mt-5 text-lg text-neutral-200">
//             Join my newsletter to get new posts before anyone else, I&apos;ll
//             send you an email with links to all of the articles.
//           </p>
//         </div>

//         <form onSubmit={Subscribe}>
//           <div className="gap-3 md:flex">
//             <input
//               type="email"
//               className="peer block w-full rounded-md border-gray-300 bg-black py-3 pl-7 pr-12 text-white focus:border-white focus:ring-white peer-invalid:text-pink-600 dark:border-zinc-500 dark:bg-zinc-900 dark:focus:ring-white sm:text-sm"
//               placeholder="Your Email"
//               autoComplete="email"
//               value={email} // Add value prop
//               onChange={(e) => setEmail(e.target.value)} // Change setMail to setEmail
//               required
//             />

//             <button
//               disabled={loading}
//               type="submit"
//               className="mt-5 w-full rounded-md bg-white py-3 px-5 text-black hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-opacity-60 md:mt-0 md:w-auto"
//             >
//               {!loading ? (
//                 "SUBSCRIBE"
//               ) : (
//                 <div className="flex w-full items-center justify-center ">
//                   <RiLoader5Fill className="w-8 animate-spin" />
//                 </div>
//               )}
//             </button>
//           </div>

//           {success ? (
//             <p className="mt-2 text-green-400 dark:text-green-400">
//               {messageState}
//             </p>
//           ) : (
//             <p className="mt-2 text-pink-500 dark:text-pink-500">
//               {messageState}
//             </p>
//           )}
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Newsletter;





"use client"
import {useState} from 'react';
import axios from 'axios';
export default function Home() {
	const [email, setEmail] = useState('');
	const [res, setRes] = useState(false);
	/**
	 *
	 *
	 * Checks validity of en email
	 */
	const checkValidity = async e => {
    e.preventDefault();
    try {
      const queryParams = new URLSearchParams({ email });
      const response = await fetch(`/api/Email?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRes(data);
    } catch (err) {
      console.log(err);
    }
  };
  
	return (
		<div className="flex flex-col items-center relative min-h-screen">
			<h2 className="font-raleway font-bold text-6xl text-primary pt-20 pb-6 md:text-3xl">
				Email <span className="text-secondary">Validator</span> App
			</h2>
			<h3 className="text-lightGrey text-2xl font-raleway font-bold uppercase tracking-wide mb-12 md:text-base md:px-4 md:text-center">
				Check if an email address exists or not
			</h3>
			<div className="flex flex-col justify-between items-center w-full md:items-center">
				<form
					className="flex w-full justify-center md:flex-col md:w-5/6"
					onSubmit={e => checkValidity(e)}
				>
					<input
						autoFocus={true}
						type="email"
						className="border-none outline-none w-2/5 bg-primary px-4 py-2 rounded-sm font-raleway md:w-full"
						placeholder="Enter the email address..."
						onChange={e => setEmail(e.target.value)}
					/>
					<button
						className="outline-none border border-danger font-bold font-raleway ml-4 px-12 py-2 rounded-sm bg-danger text-primary transition duration-300 hover:bg-bc hover:text-black md:ml-0 md:mt-4"
						onClick={checkValidity}
					>
						Validate
					</button>
				</form>
				{res && (
					<div className="flex flex-col text-primary text-raleway mt-12 w-3/6 h-4/5  md:flex-col md:w-4/6 md:h-full md:mb-12">
						<table className="bg-white w-full text-primary mb-8 md:text-sm md:mx-2">
							<thead className="font-raleway uppercase tracking-wide">
								<tr>
									<th className="border text-left px-4 py-4">
										<span className="text-secondary">
											Information
										</span>
									</th>
									<th className="border text-left px-4 py-4">
										<span className="text-secondary">
											Result
										</span>
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="border px-4 py-4">Valid</td>
									<td className="border px-4 py-4 capitalize">
										{res.valid.toString()}
									</td>
								</tr>
								<tr>
									<td className="border px-4 py-4">
										Disposable
									</td>
									<td className="border px-4 py-4 capitalize">
										{res.disposable.toString()}
									</td>
								</tr>
								<tr>
									<td className="border px-4 py-4">Domain</td>
									<td className="border px-4 py-4">
										{res.domain}
									</td>
								</tr>
								<tr>
									<td className="border px-4 py-4">Text</td>
									<td className="border px-4 py-4">
										{res.text}
									</td>
								</tr>
								<tr>
									<td className="border px-4 py-4">Reason</td>
									<td className="border px-4 py-4">
										{res.reason}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}