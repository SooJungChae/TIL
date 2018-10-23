#pragma once

template <typename T>
class Hashtable
{
	template<typename T>
	class Node
	{
		int key;
		T value;
	};
public:
	Hashtable();
	~Hashtable();

	void AddValue(char* name, T value);
private:
	int HashFunction(char* name);
private:
	Node* nodes;
	int capacity;
};

#include "Hashtable.inl"