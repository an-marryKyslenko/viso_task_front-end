'use client'

import { FC, ReactNode } from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io";

type Props = {
	onClose: () => void
	children: ReactNode
}
const Modal: FC<Props> = ({onClose, children}) => {
	return (
		<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
			<div className="relative mx-4 bg-black text-xl p-6 rounded-3xl w-full max-w-xl shadow-lg overflow-y-auto max-h-[70vh] hide-scrollbar">
				<IoMdCloseCircleOutline onClick={onClose} className='absolute top-6 right-6 text-red-600 text-3xl'/>
				{children}
			</div>
		</div>
	)
}

export default Modal;