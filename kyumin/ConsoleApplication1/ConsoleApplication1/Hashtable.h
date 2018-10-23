#pragma once

#include <list>

template<typename T>
class HashTable
{
	class Node
	{
	public:
		Node() {}
		~Node() {}
	public:
		int key;
		T* value;
	};
	class Table
	{
	public:
		Table() {}
		~Table() {}
	public:
		void AddNode(Node* pNode) { chain.push_back(pNode); }
		void Remove(Node* pNode) { chain.remove(pNode); }
		T* Find(T* value)
		{
			size_t l = chain.size();
			if (l > 0)
			{
				for (size_t i = 0; i < l; ++i)
				{
					if (chain[i]->value == value)
						return chain[i]->value;
				}
			}
			return nullptr;
		}
	private:
		Node* pFirstData;
		std::list<Node*> chain;
	};
public:
	HashTable();
	~HashTable();
public:
	void Add(T* value);
	void Remove(T* value);
	T* Find(int index);
private:
	T* Find(T* value);
	int Hash_Function(const T* adrres);
private:
	int TableCount;
	int Capacity; ///공간할당
	Table** tables;
};

 #include"HashTable.inl"