package sort;

public class InsertSort {
    public void sort(int[] data){

        for(int i= 1; i<data.length; ++i){
            for(int j = 0; j<i; ++j){
                if(data[i] <data[j]){
                    int temp = data[j];
                    data[j] = data[i];
                    for(int k=i; k>j; --k){
                        data[k] = data[k-1];
                        if(k == (j+1)){
                            data[j+1] = temp;
                            break;
                        }
                    }
                }
            }
        }
    }


    public static void main(String[] args){

        int data[] = {69, 10, 30, 2, 16, 8, 31, 22};

        InsertSort insertSort = new InsertSort();

        insertSort.sort(data);

        for(int i=0; i<data.length; ++i){
            System.out.println("data["+i+"] : "+data[i]);
        }

    }
}
