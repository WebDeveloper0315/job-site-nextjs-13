
import axios from 'axios'
import {cookies} from 'next/headers'

export async function getUser() {
  try {
    const token = cookies().get('token')
    console.log("---token---", token)
    const response = await axios.get("http://localhost:3000/api/users/currentuser", 
      {
        headers: {
          Cookie: `token=${token?.value}`,
        },
      }
    )
    return response.data.data
  } catch (error : any) {
    console.log('error',error)
  }
}

export default async function Home() {
  const user : any = await getUser()
  // const [user, setUser] = useState<any>(null)
 
  // const getUser = async () => {
  //   try {
  //     const response = await axios.get('/api/users/currentuser')
  //     //console.log(response.data)
  //     setUser(response.data.data)
  //   } catch (error: any) {
  //     message.error(error.response.data.message || error.message)
  //   }
  // }
  
  // useEffect(() => {
  //   getUser()
  // }, [])

  return (
    <div>
      <h1>Hello</h1>
      <h1>
        Current User Name: {user && user.name}
      </h1>
      <h1>
        Cuurent User's email: {user && user.email}
      </h1>
    </div>
  )
}