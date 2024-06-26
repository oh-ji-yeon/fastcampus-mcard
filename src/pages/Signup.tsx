import Form from '@/components/signup/Form'
import { COLLECTIONS } from '@/constants'
import { FormValues } from '@/models/signup'
import { auth, store } from '@/remote/firebase'

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'

function SignupPage() {
  const handleSubmit = async (formValues: FormValues) => {
    // console.log('formValues', formValues)
    const { email, password, name } = formValues

    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    // console.log('user', user)

    await updateProfile(user, {
      displayName: name,
    })

    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: name,
    }

    await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser)

    // 로그인 처리
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SignupPage
