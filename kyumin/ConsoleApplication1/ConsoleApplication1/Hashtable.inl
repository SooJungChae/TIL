#include "pch.h"
#include "Hashtable.h"

template<typename T>
Hashtable<T>::Hashtable()
{
}

template<typename T>
Hashtable<T>::~Hashtable()
{
}

template<typename T>
inline void Hashtable<T>::AddValue(char * name, T value)
{
	//name 를 해쉬화 하여 키값을 구한다.
	/*char[] arr = name;
	int hash = 0;
	for (int i = 0; i < arrCount; ++i)
	{
		hash = hash * 31 + name[i];
	}*/

	//값을 가져올때는 먼저 해쉬화한 값으로 Node를 가져온다.
	//그후 충돌로 인해 여러개가 생성 되었다면 이때부터는 값을 비교하여 가져온다.

}

template<typename T>
int Hashtable<T>::HashFunction(char * name)
{
	return 0;
}
