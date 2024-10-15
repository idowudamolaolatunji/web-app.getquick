import { BsCash } from 'react-icons/bs';
import { TbCashRegister, TbTruckDelivery } from 'react-icons/tb';
import { RiBankLine } from 'react-icons/ri';
import { LuPackageCheck } from 'react-icons/lu';
import { MdOutlinePendingActions } from 'react-icons/md';

export const paymentMethodData = [
    { label: <p className='flex align'><BsCash /> Cash</p>, value: "cash" },
    { label: <p className='flex align'><RiBankLine /> Bank Transfer</p>, value: "bank-transfer", },
    { label: <p className='flex align'><TbCashRegister /> POS</p>, value: "pos" },
];

export const deliveryStatusData = [
    { label: <p className='flex align'><TbTruckDelivery /> In Transit</p>, value: "in-transit" },
    { label: <p className='flex align'><MdOutlinePendingActions /> Pending</p>, value: "pending" },
    { label: <p className='flex align'><LuPackageCheck /> Delivered</p>, value: "delivered" },
];


export const channelData = [
    { label: "facebook", value: "facebook" },
    { label: "instagram", value: "instagram" },
    { label: "jiji", value: "jiji" },
    { label: "physical store", value: "physical-store" },
    { label: "whatsapp", value: "whatsapp" },
    { label: "flutterwave Store", value: "flutterwave-store" },
    { label: "twitter", value: "twitter" },
    { label: "jumia", value: "jumia" },
    { label: "konga", value: "konga" },
    { label: "others", value: "others" },
]