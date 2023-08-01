import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return (
    <div 
      padding={10}
      border={notification.length === 0 ? '' : 'solid'}
    >
      {notification}
    </div>
  )
}

export default Notification