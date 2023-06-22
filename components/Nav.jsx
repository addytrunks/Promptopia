"use client"

import Image from 'next/image'
import Link from 'next/link'
import {useState,useEffect} from 'react'
import {signIn,signOut,getProviders} from 'next-auth/react'

const Nav = () => {
  const isUserLoggedIn = true;
  const [providers,setProviders] = useState(null);
  const [toggleDropDown,setToggleDropDown] = useState(false);

  useEffect(() => {
    const setProvidersFunc = async () => {
      const response = await getProviders();
      setProviders(response)
    }

    setProvidersFunc();
  },[])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>

      <Link href='/' className='flex gap-2 flex-center'>
        <Image src='/assets/images/logo.svg' width={30} height={30} className='object-contain'/>
        <p className='logo_text'>Prompotopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='md:flex lg:flex xl:flex 2xl:flex hidden'>
        {isUserLoggedIn ? (
          
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
                Sign Out 
            </button>

            <Link href='/profile'>
              <Image src='/assets/images/logo.svg' width={37} height={37} className='rounded-full'/>
            </Link>
          </div>
        ):(
          <div>
            {providers && 
              Object.values(providers).map(provider => (
                <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                  Sign In
                </button>
              ))
            }
          </div>
        )}
      </div>
          
      {/* Mobile Navigation */}
      <div className='sm:flex md:hidden lg:hidden xl:hidden 2xl:hidden relative'>
            {isUserLoggedIn ? (
              <div className='flex'>
                  <Image src='/assets/images/logo.svg' width={37} height={37} onClick={() => setToggleDropDown(prevState => !prevState)} className='rounded-full'/>

                  {toggleDropDown && (
                    <div className='dropdown'>
                      <Link href='/profile' className='dropdown_link' onClick={() => setToggleDropDown(false)}>My Profile</Link>
                      <Link href='/create-prompt' className='dropdown_link' onClick={() => setToggleDropDown(false)}>Create Prompt</Link>
                      <button type='button' className='mt-5 black_btn w-full' onClick={() => {
                        setToggleDropDown(false)
                        signOut();
                      }}>Sign Out</button>
                    </div>
                  )}
              </div>
            ):(
              <div>
                {providers && 
                  Object.values(providers).map(provider => (
                    <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                      Sign In
                    </button>
                  ))
                }
              </div>
            )}
      </div>

    </nav>
  )
}

export default Nav