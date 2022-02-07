
#include <stdio.h>
#include <stdlib.h>

//global
int max, score, highscore, temp = 1, temp1 = 1;

void gameBoard(int n, int board[n][n])
{
  int arr[2] = {2, 4}, a, b, flag = 0;

  //generate random coordinates (0 to 3) and number (2,4)
  while (flag == 0)
  {

    //coordinates
    a = rand() % n;
    b = rand() % n;

    if (board[a][b] == 0) //chech if it is empty
    {
      //random number from 2 or 4
      board[a][b] = arr[rand() % 2];
      max = board[a][b];
      flag = 1;
    }
  }

  printf("\nScore:%d", score);
  if (score > highscore)
  {
    highscore = score;
  }

  printf("\nHighScore:%d\n", highscore);

  //print board
  for (int i=0; i<n; i++)
  {
    if (n == 4)
      printf("------------------------\n");
    else if (n == 5)
      printf("------------------------------\n");
    else if (n == 6)
      printf("------------------------------------\n");

    for (int j=0; j<n; j++)
    {
      if (a==i && b==j)
      {
        if (board[a][b] > max)
           max = board[a][b];

        printf("  %d  |", board[a][b]); //print random no
      }
      else if (board[i][j] > 0)
      {
        if (board[i][j] > max)
          max = board[i][j];

        printf("  %d  |", board[i][j]); //print given no.
      }
      else //if zero(empty)
      {
        printf("     |"); //print space
      }
    }
    printf("\n");
  }
  if (n == 4)
    printf("------------------------\n");
  else if (n == 5)
    printf("------------------------------\n");
  else if (n == 6)
    printf("------------------------------------\n");
}

//merging elements
void mergeUp(int n, int board[n][n])
{
  for (int j=0; j<n; j++)
    for (int i=0; i<n-1; i++)
    {
      if (board[i][j]>0 && board[i][j] == board[i+1][j])
      {
        board[i][j] = 2 * board[i][j]; //adding two tiles
        score += board[i][j];          // calculating score
        if (i == n-2) 
        {
          board[i+1][j] = 0;
        }
        else
          for (int k=i+1; k<n-1; k++)
          {
            board[k][j] = board[k+1][j];
            board[k+1][j] = 0;
          }
      }
    }
}
void mergeDown(int n, int board[n][n])
{
  for (int j=0; j<n; j++)
    for (int i = n-1; i>0; i--)
    {
      if (board[i][j]>0 && board[i][j] == board[i-1][j])
      {
        board[i][j] = 2 * board[i][j];
        score += board[i][j];
        if (i == 1)
        {
          board[i-1][j] = 0;
        }
        else
          for (int k=i-1; k>0; k--)
          {
            board[k][j] = board[k-1][j];
            board[k-1][j] = 0;
          }
      }
    }
}
void mergeLeft(int n, int board[n][n])
{
  for (int i=0; i<n; i++)
    for (int j=0; j<n-1; j++)
    {
      if (board[i][j]>0 && board[i][j] == board[i][j+1])
      {
        board[i][j] = 2 * board[i][j];
        score += board[i][j];
        if (j == n-2)
        {
          board[i][j+1] = 0;
        }
        else
          for (int k=j+1; k<n-1; k++)
          {
            board[i][k] = board[i][k+1];
            board[i][k+1] = 0;
          }
      }
    }
}
void mergeRight(int n, int board[n][n])
{
  for (int i=0; i<n; i++)
    for (int j= n-1; j>0; j--)
    {
      if (board[i][j]>0 && board[i][j]==board[i][j-1])
      {
        board[i][j] = 2 * board[i][j];
        score += board[i][j];
        if (j == 1)
        {
          board[i][j-1] = 0;
        }
        else
          for (int k=j-1; k>0; k--)
          {
            board[i][k] = board[i][k-1];
            board[i][k-1] = 0;
          }
      }
    }
}

void reset(int n, int board[n][n]) // reset board
{
  score = 0;
  for (int i=0; i<n; i++)
    for (int j=0; j<n; j++)
    {
      board[i][j] = 0;
    }
}

// shifting tiles
void shifting(int n, int board[n][n])
{
  int k, p;
  char ch;
  scanf(" %c", &ch);

  switch (ch)
  {
  case 'w':
    for (int j=0; j<n; j++) //shift the tiles upward
      for (int i=0; i<n; i++)
      {
        if (!board[i][j]) 
        {
          for (k=i+1; k<n; k++)
          {
            if (board[k][j])
            {
              board[i][j] = board[k][j];
              board[k][j] = 0;
              break;
            }
          }
        }
      }
    mergeUp(n, board); //merge the tiles upward
    break;

  case 's':
    for (int j=0; j<n; j++) //shift the tiles downwards
      for (int i=n-1; i>=0; i--)
      {
        if (!board[i][j])
        {
          for (int k=i-1; k>=0; k--)
            if (board[k][i])
            {
              board[i][j] = board[k][j];
              board[k][j] = 0;
              break;
            }
        }
      }
    mergeDown(n, board); //merge tiles downwards
    break;

  case 'a':
    for (int i=0; i<n; i++) //shift the tiles left side
      for (int j=0; j<n; j++)
      {
        if (!board[i][j])
        {
          for (int k=j+1; k<n; k++)
            if (board[i][k])
            {
              board[i][j] = board[i][k];
              board[i][k] = 0;
              break;
            }
        }
      }
    mergeLeft(n, board); //merge the tiles left side
    break;

  case 'd':
    for (int i=0; i<n; i++) //shift the tiles right side
      for (int j=n-1; j>=0; j--)
      {
        if (!board[i][j])
        {
          for (int k=j-1; k>=0; k--)
            if (board[i][k])
            {
              board[i][j] = board[i][k];
              board[i][k] = 0;
              break;
            }
        }
      }
    mergeRight(n, board); //merge the tiles right side
    break;

  case 'r':
    reset(n, board); //reset game;
    break;

  case 'q':
    temp1 = 0;  //quit game
    break;

  default:
    printf("\nInvalid!\n");
    printf("Enter a valid key :");
    temp = 0;
    break;
  }
}

int isGameOver(int n, int board[n][n])
{
  for (int i=0; i<n; i++)
    for (int j=0; j<n; j++)
    {
      if (board[i][j] == 0)
      {
        return 0; //empty space is available
      }
    }
  return 1; //board is full
}

int main()
{
  //variables
  int choice1, choice2, flag = 1, n, board[4][4];
  char ch;

  printf("\nWelcome to 2048 Game :)\n\n");

  //controls
  printf("Controls :\n\nw - move up    s - move down \na - move left  d - move right \nr - reset      q - quit \n\n");
  
  printf("******************************\n");

  while (flag)
  {
    printf("\n1. Start Game \n");
    printf("2. Quit \n");

    scanf("%d", &choice1);
    switch (choice1)
    {
      //start the game
    case 1:
      printf("\n1. Easy \n2. Medium \n3. Hard \n\n");

      scanf("%d", &choice2);

      if (choice2 == 1)
        n = 4;
      else if (choice2 == 2)
        n = 5;
      else
      {
        n = 6;
      }

      board[n][n];
      reset(n, board);

      printf("\nBest of luck!\n\n");

      while (isGameOver(n, board) != 1)
      {
        gameBoard(n, board); // print

        shifting(n, board); //shift and merge

        while (temp == 0) // for invalid key
        {
          temp = 1;
          shifting(n, board);
        }

        if (temp1 == 0) //quit the game
        {
          break;
        }
      }

      if (max >= 2048) //game won
      {
        printf("CONGRATULATIONS,you reached 2048 \n\n");
        break;
      }

      if (temp1 == 0) //quit
      {
        score = 0;
        reset(n, board);
        temp1 = 1;
        continue;
      }

      printf("GAME OVER :(\n\n"); // game over
     
      printf("Better Luck Next Time \n\n");

      printf("Your Score :%d\n\n", score);

      printf("Maximum tile number :%d\n\n", max);

      printf("Do you want to play again? (y/n) :");

      scanf(" %c", &ch);

      if (ch=='n')
      {
        printf("\nWe hope you enjoyed playing 2048!");
        flag = 0;
      }
      else if (ch!='y' && ch!='n')
      {
        printf("Invalid Key");
        flag=0;
      }
      break;
      
      // quit
    case 2:
      exit(1);
      break;

    default:
      printf("\n\nInvalid choice\n");
      break;
    }
    reset(n, board);
    score = 0;
  }
}

