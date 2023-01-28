import React, { useEffect, useState } from "react";

import cn from "classnames";
import Image from "next/image";
import { BiBlock, BiUserPlus } from "react-icons/bi";
import { BsThreeDots, BsVolumeMute } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";
import { RiVolumeMuteLine } from "react-icons/ri";
import Select from "react-select";

import { RoomInfo } from "@components/chat/ChatSettingsPanel";
import BaseModal from "@ui/BaseModal";
import Button from "@ui/Button";
import UserListItemLoading from "@ui/skeletons/UserSkeletons";
import TextInput from "@ui/TextInput";
import basicFetch from "@utils/basicFetch";
import {
  IRoom,
  IRoomMember,
  MemberGameStatus,
  MembershipStatus,
} from "global/types";

import avatar from "/public/images/default-avatar.jpg";

import AddUserModal from "./AddUserModal";

const CurrentUser: IRoomMember = {
  id: 1,
  username: "mbif",
  avatar_url: "/public/images/default-avatar.jpg",
  isOnline: true,
  gameStatus: MemberGameStatus.IDLE,
  membershipStatus: MembershipStatus.OWNER,
  isBanned: false,
  isMuted: false,
  mutedUntil: new Date(),
};

const RoomParticipant: IRoomMember[] = [
  {
    id: 1,
    username: "mbif",
    avatar_url: avatar.src,
    isOnline: true,
    gameStatus: MemberGameStatus.IDLE,
    membershipStatus: MembershipStatus.OWNER,
    isBanned: false,
    isMuted: false,
    mutedUntil: new Date(),
  },
  {
    id: 2,
    username: "folio",
    avatar_url: avatar.src,
    isOnline: true,
    gameStatus: MemberGameStatus.IDLE,
    membershipStatus: MembershipStatus.MEMBER,
    isBanned: false,
    isMuted: false,
    mutedUntil: new Date(),
  },
  {
    id: 2,
    username: "pronto",
    avatar_url: avatar.src,
    isOnline: true,
    gameStatus: MemberGameStatus.IDLE,
    membershipStatus: MembershipStatus.MEMBER,
    isBanned: false,
    isMuted: false,
    mutedUntil: new Date(),
  },
  {
    id: 2,
    username: "sisisisi",
    avatar_url: avatar.src,
    isOnline: true,
    gameStatus: MemberGameStatus.IDLE,
    membershipStatus: MembershipStatus.MEMBER,
    isBanned: false,
    isMuted: false,
    mutedUntil: new Date(),
  },
];

const MembershipStatusOptions = [
  { value: MembershipStatus.OWNER, label: "Owner" },
  { value: MembershipStatus.MEMBER, label: "Member" },
  { value: MembershipStatus.MODERATOR, label: "Admin" },
];

const getDefaultOption = (value: string) =>
  MembershipStatusOptions.find((option) => option.value === value);
// const CurrentUser: IRoomMember = RoomParticipant[0];
const MemberListItem = ({ member }: { member: IRoomMember }) => {
  const [memberShip, setMemberShip] = useState(
    getDefaultOption(member.membershipStatus)
  );
  const [muted, setMuted] = useState(member.isMuted);
  const [isBlocked, setIsBlocked] = useState(member.isBanned);
  const [showDropDown, setShowDropDown] = useState(false);

  const onMuteClick = () => {
    setMuted(!muted);
  };

  const onBlockClick = () => {
    setIsBlocked(!isBlocked);
  };

  const onKickClick = () => {
    alert("kick");
  };

  useEffect(() => {
    const handleClick = (e: any) => {
      if (!e.target.closest(".dropdown-menu")) {
        setShowDropDown(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [showDropDown]);
  console.log("@", getDefaultOption(member.membershipStatus));

  useEffect(() => {
    setMemberShip(getDefaultOption(member.membershipStatus));
  }, [true]);

  return (
    <li
      className={cn(
        "group flex items-center cursor-pointer rounded-lg border border-gray-200 justify-between p-4 hover:bg-gray-50 duration-150",
        {
          // "border-red-300": room.am_i_blocked, //tmp
        }
      )}
    >
      <div className="flex w-full items-center justify-between gap-x-2">
        <div className="flex w-full justify-between gap-x-2">
          <div className="ml-2 flex w-full flex-row items-center justify-between ">
            <div>
              <div className="ml-2 flex w-32 items-center gap-4">
                <Image
                  src={member.avatar_url}
                  alt={member + " avatar"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <p className="text-sm font-medium">{member.username}</p>
              </div>
            </div>
            <div>
              <Select
                options={MembershipStatusOptions}
                defaultValue={memberShip}
              />
            </div>
            {CurrentUser.membershipStatus === MembershipStatus.OWNER && (
              <div className=" group/dots relative flex h-9 w-9 items-center justify-center rounded-full text-xs duration-200 hover:bg-gray-300">
                <BsThreeDots
                  onClick={() => {
                    setShowDropDown(!showDropDown);
                  }}
                />
                <div
                  className={`absolute top-5 right-5  w-28 flex-col overflow-hidden rounded-l-lg bg-white ${
                    showDropDown ? "group-hover/dots:flex " : "hidden"
                  }`}
                >
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      onMuteClick();
                    }}
                    className="flex w-full min-w-min items-center gap-x-2 bg-white px-4 py-2 font-semibold text-red-500 hover:bg-gray-100 hover:text-red-500"
                  >
                    <BsVolumeMute />
                    {muted ? "Unmute" : "Mute"}
                  </button>
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      onBlockClick();
                    }}
                    className="flex min-w-min items-center gap-x-2 px-4 py-2 font-semibold text-red-600 hover:bg-red-500 hover:text-white"
                  >
                    <MdBlockFlipped />
                    {isBlocked ? "Unblock" : "Block"}
                  </button>
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      onKickClick();
                    }}
                    className="flex min-w-min items-center gap-x-2 px-4 py-2 font-semibold text-red-600 hover:bg-red-500 hover:text-white"
                  >
                    <MdBlockFlipped />
                    {isBlocked ? "Unblock" : "Block"}
                  </button>
                </div>
              </div>
            )}

            {CurrentUser.membershipStatus === MembershipStatus.MODERATOR && (
              <div className="flex gap-2">
                <RiVolumeMuteLine
                  onClick={handleMute}
                  className="h-8 w-8 rounded-full bg-gray-200 p-1 text-2xl text-red-800 duration-300 hover:bg-gray-300"
                />
                <BiBlock
                  onClick={handleBlock}
                  className="h-8 w-8 rounded-full bg-gray-200 p-1 text-2xl text-red-800 duration-300 hover:bg-gray-300"
                />
              </div>
            )}
            {CurrentUser.membershipStatus === MembershipStatus.MEMBER && (
              <div className="flex gap-2">
                <BiBlock
                  onClick={handleBlock}
                  className="h-8 w-8 rounded-full bg-gray-200 p-1 text-2xl text-red-800 duration-300 hover:bg-gray-300"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export const ChatroomSettingsModal = ({
  roomData,
  isOpen = false,
  onClose = () => {},
}: {
  roomData: IRoom;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [shouldSearch, setShouldSearch] = useState<boolean>(false);
  const searchError = false;
  const searchLoading = false;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const CurrentUser: IRoomMember = {
    id: 1,
    username: "mbif",
    avatar_url: avatar.src,
    isOnline: true,
    gameStatus: MemberGameStatus.IDLE,
    membershipStatus: MembershipStatus.OWNER,
    isBanned: false,
    isMuted: false,
    mutedUntil: new Date(),
  };

  const getRoomMembers = async () => {
    const resp = await basicFetch.get(`/chat/room/${roomData.room_id}/members`);

    if (resp.status == 200) {
      return await resp.json();
    }
    return [];
  };

  useEffect(() => {
    getRoomMembers().then((data) => {
      setSearchResults(data);
    });
  }, [true]);

  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Save");
  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setButtonText("Saving...");
    // Make API call or perform other logic here
    setTimeout(() => {
      setIsLoading(false);
      setButtonText("Save");
      console.log("data saved successfully");
    }, 2000);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className=" max-h-[1000px] w-[800px]">
        <div className="flex h-1/3 items-center justify-between">
          {CurrentUser.membershipStatus === MembershipStatus.OWNER && (
            <RoomInfo roomData={roomData} />
          )}
        </div>
        <RoomMembers roomData={roomData} />
      </div>
      <div className="flex w-full flex-row items-center justify-around pb-4">
        <Button variant="danger">Delete Room</Button>
        <Button
          variant="primary"
          type="submit"
          isLoading={isLoading}
          onClick={handleSave}
        >
          {buttonText}
        </Button>
      </div>
    </BaseModal>
  );
};

export const ChatdmSettingsModal = ({
  roomData,
  isOpen = false,
  onClose = () => {},
}: {
  roomData: IRoom;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [roomCurrentData, setRoomCurrentData] = useState<IRoom>(roomData);

  const handleMute = () => {
    setRoomCurrentData({
      ...roomCurrentData,
      isMuted: !roomCurrentData.isMuted,
    });
  };

  const handleBlock = () => {
    setRoomCurrentData({
      ...roomCurrentData,
      isBlocked: !roomCurrentData.isBlocked,
    });
  };

  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="max-h-[1000px] w-[500px] p-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Contact info</h2>

          {roomCurrentData.members[1].isOnline ? (
            <p className="flex items-center gap-2 ">
              <svg
                className="inline-block h-4 w-4 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 100-20 10 10 0 000 20z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-400">Online</span>
            </p>
          ) : (
            <p className="flex items-center gap-2">
              <svg
                className="inline-block h-4 w-4 text-red-800"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 100-20 10 10 0 000 20z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-red-800">Offline</span>
            </p>
          )}
        </div>
        <div className="h-px bg-gray-200 " />
        <div className="flex w-full flex-col items-center justify-between gap-4 pb-4">
          <div
            className="group mt-4 flex cursor-pointer items-center justify-center rounded-full bg-black transition"
            onClick={() => {
              console.log("clicked");
            }}
          >
            <Image
              src={roomCurrentData.members[1].avatar_url}
              width={100}
              height={100}
              alt={"ss"}
              className="rounded-full shadow-inner duration-300 hover:opacity-50 "
            />
            <h1 className="pointer-events-none absolute hidden text-white  duration-300 group-hover:block">
              View Profile
            </h1>
          </div>
          <div className="m-2 flex w-full flex-col items-start justify-center gap-4">
            <div className="w-full rounded-lg border bg-slate-100 p-2 text-center">
              <h1 className="">
                Full Name:
                <span className="text-gray-400"> omar magoury</span>
              </h1>
            </div>
            <div className="w-full rounded-lg border bg-slate-100 p-2 text-center">
              <h1 className="">
                Username
                <span className="text-gray-400"> @ommagour</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-around">
          <Button onClick={handleMute} variant="primary">
            Mute
          </Button>
          <Button onClick={handleBlock} variant="danger">
            Block
          </Button>
          <Button onClick={handleDelete} variant="danger">
            Delete
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ChatroomSettingsModal;

const RoomMembers = ({ roomData }: { roomData: IRoom }) => {
  const searchError = false;
  const searchLoading = false;
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);
  const [searchResults, setSearchResults] =
    useState<IRoomMember[]>(RoomParticipant);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    getMembers(e.target.value).then((data) => {
      console.log(data);
      setSearchResults(data);
    });
  };

  const getMembers = async (username = "") => {
    const resp = await basicFetch.get(
      `/chat/room/${roomData.room_id}/members/${username}`
    );
    if (resp.status == 200) {
      return await resp.json();
    }
    return [];
  };

  useEffect(() => {
    getMembers().then((resp) => {
      setSearchResults(resp);
    });
  }, []);
  return (
    <div className="h-2/3 p-8">
      <div className=" flex flex-row justify-between">
        <h2 className="text-2xl font-bold">Room Members</h2>
        <BiUserPlus
          onClick={() => {
            setShowAddUser(true);
          }}
          className="h-9 w-9 cursor-pointer rounded-full bg-gray-200 p-1 text-gray-600 shadow-xl duration-300 hover:bg-gray-300"
        />
      </div>
      <div className="h-px bg-gray-200 " />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("search");
        }}
        className="group relative h-10 w-full"
      >
        <label className="absolute top-3 left-3 flex items-center justify-center text-gray-400">
          <button type="submit" className="h-full w-full cursor-default">
            <IoSearchOutline className="h-6 w-6 text-gray-400 group-focus-within:text-secondary group-hover:text-secondary" />
          </button>
        </label>
        <TextInput
          name="search"
          placeholder="Search for a member"
          onChange={(e) => handleSearchChange(e)}
          inputClassName="pl-12 py-[8px] "
        />
      </form>
      <ul className="no-scrollbar mt-4 flex h-[calc(60vh-160px)] flex-col gap-y-1 overflow-y-scroll scroll-smooth">
        {!searchError &&
          !searchLoading &&
          searchResults &&
          searchResults?.map((member: IRoomMember, index: number) => (
            <MemberListItem key={index} member={member} />
          ))}
        {searchLoading &&
          [...new Array(6)].map((i) => <UserListItemLoading key={i} />)}
        {!searchError && searchResults?.length === 0 && (
          <p className="py-10 text-center text-gray-400">No results found</p>
        )}
      </ul>
      {showAddUser && (
        <AddUserModal
          isOpen={showAddUser}
          onClose={() => {
            setShowAddUser(false);
          }}
        />
      )}
    </div>
  );
};
