"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const questions = [
  {
    question: 'What is this website about?',
    answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque dicta, iste sit cumque, odit sequi fugit repellat pariatur incidunt omnis doloremque nisi similique voluptate praesentium nulla ipsum, eligendi illo necessitatibus.'
  },
  {
    question: 'How can I contact support?',
    answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque dicta, iste sit cumque, odit sequi fugit repellat pariatur incidunt omnis doloremque nisi similique voluptate praesentium nulla ipsum, eligendi illo necessitatibus.'
  },
  {
    question: 'Is there a mobile app available?',
    answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque dicta, iste sit cumque, odit sequi fugit repellat pariatur incidunt omnis doloremque nisi similique voluptate praesentium nulla ipsum, eligendi illo necessitatibus.'
  },
];

const Questions = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <div className='max-w-screen-xl mx-auto'>
      {/* {questions.map((item, index) => (
        <div key={index} className='mb-4 bg-white rounded shadow'>
          <div
            className='flex justify-between items-left max-w-screen px-4 py-3 cursor-pointer'
            onClick={() => toggleQuestion(index)}
          >
            <h3 className='text-lg font-semibold'>{item.question}</h3>
            {activeQuestion === index ? <AiOutlineMinus className='text-gray-600' /> : <AiOutlinePlus className='text-gray-600' />}
          </div>
          {activeQuestion === index && (
            <motion.div
              initial='collapsed'
              animate='open'
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.3 }}
              className='px-4 py-3 overflow-hidden'
            >
              <p className='text-gray-700'>{item.answer}</p>
            </motion.div>
          )}
        </div>
      ))} */}
    </div>
  );
};

export default Questions;
