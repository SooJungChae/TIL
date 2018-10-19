#include "HashTable.h"

template<typename T>
HashTable<T>::HashTable()
	: Capacity(1061), TableCount(0)
{
	tables = new Table *[Capacity];
	memset(tables, 0, sizeof(Table) * Capacity);
}

template<typename T>
HashTable<T>::~HashTable()
{
	delete tables;
}

template<typename T>
inline void HashTable<T>::Add(T* value)
{
	//주소값을 해쉬화 한다?
	// TableCount 총 공간의 80%가넘어 버릴경우 공간늘 늘리고 이동하는 작업을 한다.
		// 지금은 필요없는 기능 최적화 기능으로 알고있음
	Node* pnewNode = new Node();
	pnewNode->key = Hash_Function(value);
	pnewNode->value = value;
	if (tables[pnewNode->key] == nullptr)
	{
		tables[pnewNode->key] = new Table();
		TableCount++;
	}
	tables[pnewNode->key]->AddNode(pnewNode);
}

template<typename T>
inline T * HashTable<T>::Find(T* value)
{
	int key = Hash_Function(value);
	tables[key].Find(value);
	return NULL;
}

template<typename T>
int HashTable<T>::Hash_Function(const T* adrres)
{
	return reinterpret_cast<int>(*adrres) % Capacity;
}
