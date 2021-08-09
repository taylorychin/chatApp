
export default function Component({ channel }) {
    return (
        <>
            <Link to="/channels/:id">
                <h3>Channel: {channel.title} </h3>
                <h5> {channel.desc} </h5>
            </Link>
        </>
    )
}