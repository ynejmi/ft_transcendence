/* eslint-disable @next/next/no-img-element */
import React from "react";

import MiddleBar from "@components/chat/MiddleBar";
import TextInput from "@ui/TextInput";
import cn from "classnames";
import Head from "next/head";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";

import friend1 from "../assets/friends/friend1.jpeg";
import friend2 from "../assets/friends/friend2.jpeg";
import friend3 from "../assets/friends/friend3.jpeg";
import Leftbar from "../components/chat/Leftbar";
// import { Context } from "../context/chat.context";

import "swiper/css";

const Chat = () => {
  const chatData = [
    {
      id: 1,
      avatar: friend1,
      name: "hamid sma9lo",
      lastMessage: "hello him",
      lastMessageTime: "12:00",
      unreadMessages: 0,
    },
    {
      id: 2,
      avatar: friend2,
      name: "karima benzema",
      lastMessage: "hello him",
      lastMessageTime: "12:00",
      unreadMessages: 0,
    },
    {
      id: 3,
      avatar: friend3,
      name: "sami hachhouch",
      lastMessage: "hello him",
      lastMessageTime: "12:00",
      unreadMessages: 0,
    },
  ];
  const onlineFriends = [
    {
      id: 1,
      avatar: friend1,
      name: "hamid sma9lo",
    },
    {
      id: 2,
      avatar: friend2,
      name: "karima benzema",
    },
    {
      id: 3,
      avatar: friend3,
      name: "sami hachhouch",
    },
    {
      id: 4,
      avatar: friend1,
      name: "yassine sandwich",
    },
    {
      id: 5,
      avatar: friend2,
      name: "saida lankoul",
    },
    {
      id: 6,
      avatar: friend3,
      name: "jamil pistfrien",
    },
  ];
  return (
    <div className="flex">
      <Head>
        <title>Dashboard</title>
      </Head>
      <Leftbar />
      <MiddleBar title="Chat">
        <TextInput
          className={cn(
            "h-full w-full rounded-xl border py-2 pl-12 text-gray-500 list-none duration-150 focus-within:border-secondary hover:border-secondary outline-none",
            {
              "pr-3": true,
            }
          )}
          placeholder="Search"
          label=""
          name="search"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <div className="flex flex-col items-center justify-center ">
          <h1 className="text-2xl font-bold text-white">Online Friends</h1>
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            className="w-full"
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
            }}
          >
            {onlineFriends.map((friend) => (
              <SwiperSlide key={friend.id}>
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={friend.avatar.src}
                    className="w-12 h-12 rounded-full"
                  />
                  <h1 className="text-sm text-center text-white">{friend.name}</h1>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-white">Chats</h1>
          <div className="flex flex-col items-center justify-center w-full">
            {chatData.map((chat) => (
              <Link href={`/chat/${chat.id}`} key={chat.id} className="w-full">
                <div className="flex flex-col items-center justify-between p-4 cursor-pointer hover:bg-gray-700 rounded-xl">
                  <div className="flex items-center justify-center">
                    <img
                      src={chat.avatar.src}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex flex-col items-start justify-center ml-4">
                      <h1 className="text-lg text-white">{chat.name}</h1>
                      <h1 className="text-sm text-gray-500">
                        {chat.lastMessage}
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <h1 className="text-sm text-gray-500">
                      {chat.lastMessageTime}
                    </h1>
                    {chat.unreadMessages > 0 && ( // if unread messages > 0 show the badge with the number of unread messages
                      <div className="flex flex-row items-center justify-center w-6 h-6 rounded-full bg-secondary">
                        <h1 className="text-sm text-white">
                          {chat.unreadMessages}
                        </h1>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </MiddleBar>
    </div>
  );
};

export default Chat;
