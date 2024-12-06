"""add questions column to quiz

Revision ID: xxx
Revises: 
Create Date: 2024-01-06 10:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers
revision = 'xxx'
down_revision = None  # Set to the ID of the previous revision if any
branch_labels = None
depends_on = None

def upgrade() -> None:
    # Drop existing quizzes table if it exists
    op.drop_table('quizzes')
    
    # Create new quizzes table with correct schema
    op.create_table('quizzes',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(), nullable=True),
        sa.Column('questions', sa.JSON(), nullable=True),
        sa.Column('user_id', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade() -> None:
    op.drop_table('quizzes')