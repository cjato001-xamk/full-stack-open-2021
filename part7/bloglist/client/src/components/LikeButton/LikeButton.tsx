type LikeButtonProps = {
  like: () => void
  isLiking: boolean
}

const LikeButton = ({ like, isLiking }: LikeButtonProps): JSX.Element => {
  return (
    <button onClick={like} disabled={isLiking}>
      {!isLiking ? 'Like' : 'Liking...'}
    </button>
  )
}

export { LikeButton }
