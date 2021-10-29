import { Button, Badge } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

type LikeButtonProps = {
  like: () => void
  isLiking: boolean
  likes: number
}

const LikeButton = ({
  like,
  isLiking,
  likes,
}: LikeButtonProps): JSX.Element => {
  return (
    <Button onClick={like} disabled={isLiking}>
      <FontAwesomeIcon icon={faThumbsUp} /> {!isLiking ? 'Like' : 'Liking...'}{' '}
      <Badge bg='secondary'>{likes}</Badge>
    </Button>
  )
}

export { LikeButton }
