import {
  BiArrowBack,
  BiSearch,
  BiSolidCalendarEvent,
  BiSolidPhoneCall,
  BiUserCircle,
} from "react-icons/bi";
import { BsArrowRightCircleFill, BsCheckLg, BsCircle } from "react-icons/bs";
import { CgMenu, CgNotes, CgShutterstock } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiChevronsLeft,
  FiChevronsRight,
  FiSettings,
} from "react-icons/fi";
import { IoIosMail, IoLogoWhatsapp } from "react-icons/io";
import { LuWalletCards } from "react-icons/lu";
import {
  MdArrowUpward,
  MdDeleteOutline,
  MdLocationPin,
  MdOutlineElectricMoped,
  MdOutlineHistory,
  MdOutlineMicrowave,
  MdOutlineModeEdit,
  MdOutlineWorkHistory,
  MdWorkHistory,
} from "react-icons/md";
import { RiFileList3Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { SiGeneralmotors } from "react-icons/si";
import { TbCalendarCheck, TbHomeBolt, TbLogout } from "react-icons/tb";
import { TfiHeadphoneAlt } from "react-icons/tfi";

export const Icons: { [key: string]: any } = {
  ArrowUpDown: MdArrowUpward,
  ArrowLeft: BiArrowBack,
  Calendar: TbCalendarCheck,
  CalendarClock: BiSolidCalendarEvent,
  Call: BiSolidPhoneCall,
  Check: BsCheckLg,
  ChevronDown: FiChevronDown,
  ChevronUp: FiChevronUp,
  ChevronLeft: FiChevronLeft,
  ChevronRight: FiChevronRight,
  ChevronsLeft: FiChevronsLeft,
  ChevronsRight: FiChevronsRight,
  Circle: BsCircle,
  Delete: MdDeleteOutline,
  Edit: MdOutlineModeEdit,
  Email: IoIosMail,
  Headphones: TfiHeadphoneAlt,
  History: MdOutlineHistory,
  HistoryOutline: MdOutlineWorkHistory,
  Home: TbHomeBolt,
  Location: MdLocationPin,
  Logout: TbLogout,
  Menu: CgMenu,
  Note: CgNotes,
  RightArrow: BsArrowRightCircleFill,
  Scooter: MdOutlineElectricMoped,
  Search: BiSearch,
  Settings: FiSettings,
  Stock: CgShutterstock,
  User: BiUserCircle,
  Users: FaUsers,
  ViewDetails: RiFileList3Fill,
  VehicleManage: SiGeneralmotors,
  WaveFile: MdOutlineMicrowave,
  WaveNote: LuWalletCards,
  Whatsapp: IoLogoWhatsapp,
  WorkHistory: MdWorkHistory,
  X: RxCross2,
};
