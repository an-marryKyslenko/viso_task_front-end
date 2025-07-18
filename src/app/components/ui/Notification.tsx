type Props = {
	message: string
	error?: boolean,
}
const Notification = ({message, error}: Props) => {
	return (
		<div 
			className={`fixed top-10 rounded-2xl right-10 p-4 ${error ? 'bg-red-600/50': 'bg-green-600/50'}`}
		>
			<p className='text-white'>{message}</p>
		</div>
	)
}

export default Notification