/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './App.css';

function DateTime(props) {
  const { date } = props;
  return <p className="date">{date}</p>;
}

const DateTimePretty = (props) => {
  const currentDate = new Date();
  const [datePart, timePart] = props.date.split(' ');
  const [year, month, day] = datePart.split('-');
  const [hours, minutes, seconds] = timePart.split(':');

  // Create a new Date object from the parsed components
  const date = new Date(year, month - 1, day, hours, minutes, seconds);

  const differenceInMinutes = Math.floor(
    (currentDate.getTime() - date.getTime()) / 1000 / 60
  );
  let updateDate = '';

  if (differenceInMinutes < 0) {
    updateDate = 'В будущем';
  } else if (differenceInMinutes < 60) {
    updateDate = `${Math.ceil(differenceInMinutes)} минут назад`;
  } else if (differenceInMinutes < 1440) {
    updateDate = `${Math.floor(differenceInMinutes / 60)} часов назад`;
  } else {
    updateDate = `${Math.floor(differenceInMinutes / 1440)} дней назад`;
  }

  return <DateTime date={updateDate} />;
};

function Video(props) {
  return (
    <div className="video">
      <iframe
        src={props.url}
        className="iframe-borderless"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
      <DateTimePretty date={props.date} />
    </div>
  );
}

function VideoList(props) {
  return props.list.map((item, index) => (
    <Video key={index} url={item.url} date={item.date} />
  ));
}

const randomDate = () => {
  const currentDate = new Date();
  const diff = Math.floor(Math.random() * (604800000 - 60000)) + 60000;
  const newDate = new Date(currentDate.getTime() - diff);

  // Format as 'YYYY-MM-DD HH:MM:SS'
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const day = String(newDate.getDate()).padStart(2, '0');
  const hours = String(newDate.getHours()).padStart(2, '0');
  const minutes = String(newDate.getMinutes()).padStart(2, '0');
  const seconds = String(newDate.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export default function App() {
  // eslint-disable-next-line no-unused-vars
  const [list, setList] = useState([
    {
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      date: randomDate(),
    },
    {
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      date: randomDate(),
    },
    {
      url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
      date: randomDate(),
    },
    {
      url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
      date: randomDate(),
    },
    {
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      date: randomDate(),
    },
    {
      url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
      date: randomDate(),
    },
  ]);

  return <VideoList list={list} />;
}
