
type UpdateUserPageProps = {
    params: Promise<{
        user_id: number;
    }>
}

const UpdateUserPage = async ({ params }: UpdateUserPageProps) => {

    return <>{JSON.stringify(await params)}</>
}

export default UpdateUserPage;